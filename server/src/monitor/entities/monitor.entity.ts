import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UptimeLog } from './uptime-log.entity';

@Entity('monitors')
export class Monitor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  url: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'unknown' })
  status: string;

  @Column({ nullable: true })
  responseTime: number;

  @Column({ nullable: true })
  lastCheckedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UptimeLog, (log) => log.monitor)
  logs: UptimeLog[];
}
