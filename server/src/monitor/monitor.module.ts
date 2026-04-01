import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorController } from './monitor.controller';
import { MonitorService } from './monitor.service';
import { Monitor } from './entities/monitor.entity';
import { UptimeLog } from './entities/uptime-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Monitor, UptimeLog])],
  controllers: [MonitorController],
  providers: [MonitorService],
})
export class MonitorModule {}
