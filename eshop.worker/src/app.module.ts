import { Module } from '@nestjs/common';
import { AppService } from './AppService';
import { RabbitMQConsumer, RabbitMQModule } from 'mqmanager-nestjs';

@Module({
  imports: [RabbitMQModule],
  controllers: [],
  providers: [AppService, RabbitMQConsumer],
})
export class AppModule {}
