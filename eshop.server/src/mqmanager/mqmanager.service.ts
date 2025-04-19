import { Injectable } from '@nestjs/common';
import { RabbitMQProducer } from 'mqmanager-nestjs';

@Injectable()
export class MqmanagerService {
  constructor(private producer: RabbitMQProducer) {
    this.producer = new RabbitMQProducer(
      process.env.QueueName, // Queue name
      process.env.ExchangeName, // Exchange name
      process.env.ConnectionString, // RabbitMQ connection string);
    );
  }

  async produceMessage(message: any) {
    try {
      await this.producer.connect();
      console.log('Producer connected successfully.');
      console.log(`QueueName=${process.env.QueueName}`);
      console.log(`ExchangeName=${process.env.ExchangeName}`);
      console.log(`ConnectionString=${process.env.ConnectionString}`);

      // Send a message
      await this.producer.sendMessage(message);

      console.log('Message sent:', message);
    } catch (error) {
      //TODO: Collect logs with winston or similar library
      console.error('Producer error:', error);
      throw error;
    } finally {
      await this.producer.close();
    }
  }
}
