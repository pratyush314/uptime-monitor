import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';

@Controller('monitors')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Post()
  create(@Body() dto: CreateMonitorDto) {
    return this.monitorService.create(dto);
  }

  @Get()
  findAll() {
    return this.monitorService.findAll();
  }

  @Get(':id/logs')
  getLogs(@Param('id') id: string) {
    return this.monitorService.getLogs(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitorService.remove(id);
  }

  @Patch(':id/stop')
  stopMonitoring(@Param('id') id: string) {
    return this.monitorService.stopMonitoring(id);
  }

  @Patch(':id/resume')
  resumeMonitoring(@Param('id') id: string) {
    return this.monitorService.resumeMonitoring(id);
  }
}
