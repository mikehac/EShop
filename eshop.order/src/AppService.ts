// app.service.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppService {
  @MessagePattern('my_queue') // or just 'my_queue' if using simple queues
  handleMessage(@Payload() data: any) {
    console.log('Received message:', data);
    // process your message here

    console.log('test');
  }
}
