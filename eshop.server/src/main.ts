import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { appExceptionsFilter } from './customFilters/appExceptionsFilter';
import * as cookieParser from 'cookie-parser';

// Load environment variables from the .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // Enable cookie parsing
  app.enableCors({
    // origin: '*',
    origin: process.env.CORS_ORIGIN, // 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalFilters(new appExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
