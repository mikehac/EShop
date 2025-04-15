import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
// import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import { appExceptionsFilter } from "./customFilters/appExceptionsFilter";
import * as cookieParser from "cookie-parser";
import { AuthModule } from "./auth/auth.module";

// Load environment variables from the .env file
dotenv.config();

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AuthModule);

  app.use(cookieParser()); // Enable cookie parsing
  const allowedOrigins = (process.env.CORS_ORIGINS || "").split(","); // Example: "http://localhost:5173,http://example.com"
  app.enableCors({
    // origin: '*',
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  });
  app.useGlobalFilters(new appExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
