import { Module } from '@nestjs/common';
import { MqmanagerController } from './mqmanager.controller';
import { MqmanagerService } from './mqmanager.service';
import { RabbitMQProducer } from 'mqmanager-nestjs';

@Module({
  imports: [MqmanagerModule],
  controllers: [MqmanagerController],
  providers: [MqmanagerService, RabbitMQProducer],
})
export class MqmanagerModule {}
