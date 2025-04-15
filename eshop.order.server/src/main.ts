import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order/order.module';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  app.enableCors({
    // origin: '*',
    origin: process.env.CORS_ORIGIN, // 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
