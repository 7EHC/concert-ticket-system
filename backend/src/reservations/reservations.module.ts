import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './reservation.entity';
import { ReservationAction } from './reservation-action.entity';
import { ConcertsModule } from '../concerts/concerts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, ReservationAction]),
    ConcertsModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
