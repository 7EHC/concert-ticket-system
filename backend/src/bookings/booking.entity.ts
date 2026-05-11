import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../entities/user.entity';
import { Concert } from '../concerts/concert.entity';

export enum BookingStatus {
  RESERVED = 'reserved',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'concert_id' })
  concertId: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.RESERVED,
  })
  status: BookingStatus;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'concert_id' })
  concert: Concert;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
