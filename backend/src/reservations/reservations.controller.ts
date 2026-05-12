import { Controller, Get, Post, Body, Param, Put, Query, UseGuards, Req } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Roles(UserRole.USER)
  reserve(@Req() req: any, @Body() body: { concertId: string }): Promise<Reservation> {
    return this.reservationsService.reserve(req.user.id, body.concertId);
  }

  @Put(':id/cancel')
  @Roles(UserRole.USER)
  cancel(
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<Reservation> {
    return this.reservationsService.cancel(req.user.id, id);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN)
  async getStats() {
    return this.reservationsService.getStats();
  }

  @Get('history')
  @Roles(UserRole.ADMIN)
  async getHistory(): Promise<any[]> {
    return this.reservationsService.getHistory();
  }

  @Get()
  async findAll(@Req() req: any, @Query('userId') userId?: string): Promise<Reservation[]> {
    // If not admin, can only see their own reservations
    if (req.user.role !== UserRole.ADMIN) {
      return this.reservationsService.findAll(req.user.id);
    }
    // If admin, can see all or filter by userId
    return this.reservationsService.findAll(userId);
  }
}
