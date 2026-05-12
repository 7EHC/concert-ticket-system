import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../entities/user.entity';
import { Concert } from '../concerts/concert.entity';

export enum ActionType {
  RESERVE = 'reserve',
  CANCEL = 'cancel',
}

@Entity('reservation_actions')
export class ReservationAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'concert_id' })
  concertId: string;

  @Column({ name: 'reservation_id' })
  reservationId: string;

  @Column({
    type: 'enum',
    enum: ActionType,
  })
  action: ActionType;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Concert, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'concert_id' })
  concert: Concert;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
