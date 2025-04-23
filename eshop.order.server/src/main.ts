import * as dotenv from 'dotenv';
// Load environment variables from the .env file
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order/order.module';
async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const allowedOrigins = (process.env.CORS_ORIGINS || '').split(','); // Example: "http://localhost:5173,http://example.com"
  app.enableCors({
    // origin: '*',
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
