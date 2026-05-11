import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { BookingAction, ActionType } from './booking-action.entity';
import { ConcertsService } from '../concerts/concerts.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(BookingAction)
    private readonly actionRepository: Repository<BookingAction>,
    private readonly concertsService: ConcertsService,
  ) {}

  async reserve(userId: string, concertId: string): Promise<Booking> {
    const concert = await this.concertsService.findOne(concertId);

    const existingBooking = await this.bookingRepository.findOne({
      where: { userId, concertId, status: BookingStatus.RESERVED },
    });

    if (existingBooking) {
      throw new BadRequestException('User already has a reserved seat for this concert');
    }

    const activeBookingsCount = await this.bookingRepository.count({
      where: { concertId, status: BookingStatus.RESERVED },
    });

    if (activeBookingsCount >= concert.totalSeats) {
      throw new BadRequestException('This concert is fully booked');
    }

    const booking = this.bookingRepository.create({
      userId,
      concertId,
      status: BookingStatus.RESERVED,
    });

    const savedBooking = await this.bookingRepository.save(booking);

    // Log action
    await this.actionRepository.save({
      userId,
      concertId,
      bookingId: savedBooking.id,
      action: ActionType.RESERVE,
    });

    return savedBooking;
  }

  async cancel(userId: string, bookingId: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, userId },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found for this user`);
    }

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    booking.status = BookingStatus.CANCELLED;
    const updatedBooking = await this.bookingRepository.save(booking);

    // Log action
    await this.actionRepository.save({
      userId: booking.userId,
      concertId: booking.concertId,
      bookingId: booking.id,
      action: ActionType.CANCEL,
    });

    return updatedBooking;
  }

  async findAll(userId?: string): Promise<Booking[]> {
    const query = this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.concert', 'concert')
      .leftJoinAndSelect('booking.user', 'user')
      .orderBy('booking.createdAt', 'DESC');

    if (userId) {
      query.where('booking.userId = :userId', { userId });
    }

    return await query.getMany();
  }

  async getHistory(): Promise<BookingAction[]> {
    return await this.actionRepository.find({
      relations: ['user', 'concert'],
      order: { createdAt: 'DESC' },
    });
  }

  async getStats() {
    const concerts = await this.concertsService.findAll();
    const totalSeats = concerts.reduce((sum, c) => sum + c.totalSeats, 0);

    const reserveCount = await this.bookingRepository.count({
      where: { status: BookingStatus.RESERVED },
    });

    const cancelCount = await this.bookingRepository.count({
      where: { status: BookingStatus.CANCELLED },
    });

    return {
      totalSeats,
      reserve: reserveCount,
      cancel: cancelCount,
    };
  }
}
