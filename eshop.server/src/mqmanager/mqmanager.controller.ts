import { Body, Controller, Post } from '@nestjs/common';
import { MqmanagerService } from './mqmanager.service';

@Controller('api/mqmanager')
export class MqmanagerController {
  constructor(private mqservice: MqmanagerService) {}

  @Post('sendPurchuse')
  async sendPurchuseMessage(@Body() message) {
    await this.mqservice.produceMessage(message);
    return {
      statusCode: 200,
    };
  }
}
