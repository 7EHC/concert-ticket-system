import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { Concert } from './concert.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('concerts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createConcertDto: { name: string; description: string; totalSeats: number }): Promise<Concert> {
    return this.concertsService.create(createConcertDto);
  }

  @Get()
  findAll(): Promise<Concert[]> {
    return this.concertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Concert> {
    return this.concertsService.findOne(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.concertsService.remove(id);
  }
}
