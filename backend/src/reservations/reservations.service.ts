import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation, ReservationStatus } from './reservation.entity';
import { ReservationAction, ActionType } from './reservation-action.entity';
import { ConcertsService } from '../concerts/concerts.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationAction)
    private readonly actionRepository: Repository<ReservationAction>,
    private readonly concertsService: ConcertsService,
  ) {}

  async reserve(userId: string, concertId: string): Promise<Reservation> {
    const concert = await this.concertsService.findOne(concertId);

    const existingReservation = await this.reservationRepository.findOne({
      where: { userId, concertId, status: ReservationStatus.RESERVED },
    });

    if (existingReservation) {
      throw new BadRequestException('User already has a reserved seat for this concert');
    }

    const activeReservationsCount = await this.reservationRepository.count({
      where: { concertId, status: ReservationStatus.RESERVED },
    });

    if (activeReservationsCount >= concert.totalSeats) {
      throw new BadRequestException('This concert is fully reserved!');
    }

    const reservation = this.reservationRepository.create({
      userId,
      concertId,
      status: ReservationStatus.RESERVED,
    });

    const savedReservation = await this.reservationRepository.save(reservation);

    // Log action
    await this.actionRepository.save({
      userId,
      concertId,
      reservationId: savedReservation.id,
      action: ActionType.RESERVE,
    });

    return savedReservation;
  }

  async cancel(userId: string, reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId, userId },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found for this user`);
    }

    if (reservation.status === ReservationStatus.CANCELLED) {
      throw new BadRequestException('Reservation is already cancelled');
    }

    reservation.status = ReservationStatus.CANCELLED;
    const updatedReservation = await this.reservationRepository.save(reservation);

    // Log action
    await this.actionRepository.save({
      userId: reservation.userId,
      concertId: reservation.concertId,
      reservationId: reservation.id,
      action: ActionType.CANCEL,
    });

    return updatedReservation;
  }

  async findAll(userId?: string): Promise<Reservation[]> {
    const query = this.reservationRepository.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.concert', 'concert')
      .leftJoinAndSelect('reservation.user', 'user')
      .orderBy('reservation.createdAt', 'DESC');

    if (userId) {
      query.where('reservation.userId = :userId', { userId });
    }

    return await query.getMany();
  }

  async getHistory(): Promise<ReservationAction[]> {
    return await this.actionRepository.find({
      relations: ['user', 'concert'],
      order: { createdAt: 'DESC' },
    });
  }

  async getStats() {
    const concerts = await this.concertsService.findAll();
    const totalSeats = concerts.reduce((sum, c) => sum + c.totalSeats, 0);

    const reserveCount = await this.reservationRepository.count({
      where: { status: ReservationStatus.RESERVED },
    });

    const cancelCount = await this.reservationRepository.count({
      where: { status: ReservationStatus.CANCELLED },
    });

    return {
      totalSeats,
      reserve: reserveCount,
      cancel: cancelCount,
    };
  }
}
