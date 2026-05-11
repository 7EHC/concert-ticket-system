import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './booking.entity';
import { BookingAction } from './booking-action.entity';
import { ConcertsModule } from '../concerts/concerts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, BookingAction]),
    ConcertsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
