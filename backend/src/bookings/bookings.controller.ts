import { Controller, Get, Post, Body, Param, Put, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles(UserRole.USER)
  reserve(@Req() req: any, @Body() body: { concertId: string }): Promise<Booking> {
    return this.bookingsService.reserve(req.user.id, body.concertId);
  }

  @Put(':id/cancel')
  @Roles(UserRole.USER)
  cancel(
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<Booking> {
    return this.bookingsService.cancel(req.user.id, id);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN)
  async getStats() {
    return this.bookingsService.getStats();
  }

  @Get('history')
  @Roles(UserRole.ADMIN)
  async getHistory(): Promise<any[]> {
    return this.bookingsService.getHistory();
  }

  @Get()
  async findAll(@Req() req: any, @Query('userId') userId?: string): Promise<Booking[]> {
    // If not admin, can only see their own bookings
    if (req.user.role !== UserRole.ADMIN) {
      return this.bookingsService.findAll(req.user.id);
    }
    // If admin, can see all or filter by userId
    return this.bookingsService.findAll(userId);
  }
}
