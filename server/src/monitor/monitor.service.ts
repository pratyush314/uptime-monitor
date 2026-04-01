import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { Monitor } from './entities/monitor.entity';
import { UptimeLog } from './entities/uptime-log.entity';
import { CreateMonitorDto } from './dto/create-monitor.dto';

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(Monitor)
    private monitorRepo: Repository<Monitor>,
    @InjectRepository(UptimeLog)
    private logRepo: Repository<UptimeLog>,
  ) {}

  async create(dto: CreateMonitorDto): Promise<Monitor> {
    const monitor = this.monitorRepo.create(dto);
    const saved = await this.monitorRepo.save(monitor);
    await this.checkSingle(saved);
    const updated = await this.monitorRepo.findOne({ where: { id: saved.id } });
    if (!updated)
      throw new NotFoundException('Monitor not found after creation');
    return updated;
  }

  findAll(): Promise<Monitor[]> {
    return this.monitorRepo.find({ order: { createdAt: 'DESC' } });
  }

  async getLogs(id: string): Promise<UptimeLog[]> {
    const monitor = await this.monitorRepo.findOne({ where: { id } });
    if (!monitor) throw new NotFoundException('Monitor not found');
    return this.logRepo.find({
      where: { monitor: { id } },
      order: { checkedAt: 'DESC' },
      take: 50,
    });
  }

  async checkSingle(monitor: Monitor): Promise<void> {
    const start = Date.now();
    let status = 'down';
    let statusCode: number | null = null;
    let responseTime: number | null = null;

    try {
      const res = await axios.get(monitor.url, { timeout: 10000 });
      responseTime = Date.now() - start;
      statusCode = res.status;
      status = res.status < 400 ? 'up' : 'down';
    } catch {
      responseTime = Date.now() - start;
    }

    await this.monitorRepo.update(monitor.id, {
      status,
      responseTime,
      lastCheckedAt: new Date(),
    });

    const log = this.logRepo.create({
      status,
      responseTime,
      statusCode: statusCode || undefined,
      monitor,
    });
    await this.logRepo.save(log);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async checkAll(): Promise<void> {
    const monitors = await this.monitorRepo.find({ where: { isActive: true } });
    await Promise.all(monitors.map((m) => this.checkSingle(m)));
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.monitorRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Monitor not found');
    }

    return { message: 'Monitor deleted successfully' };
  }

  async stopMonitoring(id: string): Promise<Monitor> {
    const monitor = await this.monitorRepo.findOne({ where: { id } });

    if (!monitor) {
      throw new NotFoundException('Monitor not found');
    }

    monitor.isActive = false;
    return await this.monitorRepo.save(monitor);
  }

  async resumeMonitoring(id: string): Promise<Monitor> {
    const monitor = await this.monitorRepo.findOne({ where: { id } });

    if (!monitor) {
      throw new NotFoundException('Monitor not found');
    }

    monitor.isActive = true;
    return await this.monitorRepo.save(monitor);
  }
}
