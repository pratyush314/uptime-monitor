import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Monitor } from './monitor.entity';

@Entity('uptime_logs')
export class UptimeLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string; // 'up' | 'down'

  @Column({ nullable: true })
  responseTime: number;

  @Column({ nullable: true })
  statusCode: number;

  @CreateDateColumn()
  checkedAt: Date;

  @ManyToOne(() => Monitor, (monitor) => monitor.logs, { onDelete: 'CASCADE' })
  monitor: Monitor;
}
