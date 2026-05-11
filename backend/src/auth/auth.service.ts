import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, pass: string, role?: any) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already exists');
    }
 
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
