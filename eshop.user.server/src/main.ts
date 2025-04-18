import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors({
    origin: '*',
  });

  await app.listen(3003);
}
bootstrap();
