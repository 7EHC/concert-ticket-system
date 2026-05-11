import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.name, body.email, body.password, body.role);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh() {
    // Placeholder for refresh token logic
    return { message: 'Refresh not implemented yet' };
  }
}
