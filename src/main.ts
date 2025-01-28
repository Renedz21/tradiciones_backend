import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      colors: true,
    }),
  });

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
