import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async create(createConcertDto: { name: string; description: string; totalSeats: number }): Promise<Concert> {
    const concert = this.concertRepository.create(createConcertDto);
    return await this.concertRepository.save(concert);
  }

  async findAll(): Promise<any[]> {
    return await this.concertRepository
      .createQueryBuilder('concert')
      .loadRelationCountAndMap('concert.reservedSeats', 'concert.bookings', 'booking', (qb) =>
        qb.where('booking.status = :status', { status: 'reserved' }),
      )
      .orderBy('concert.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<any> {
    const concert = await this.concertRepository
      .createQueryBuilder('concert')
      .loadRelationCountAndMap('concert.reservedSeats', 'concert.bookings', 'booking', (qb) =>
        qb.where('booking.status = :status', { status: 'reserved' }),
      )
      .where('concert.id = :id', { id })
      .getOne();

    if (!concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return concert;
  }

  async remove(id: string): Promise<void> {
    const result = await this.concertRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
  }
}
