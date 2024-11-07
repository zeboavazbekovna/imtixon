import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import path, { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ExceptionHandlerFilter } from './filter';
import * as device from 'express-device';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); 
  const configService = app.get(ConfigService);

  app.setBaseViewsDir(join(__dirname, '..', 'frontend'));
  app.setViewEngine('ejs');
  app.enableCors();

  // Statik papkani sozlash (uploads papkasi uchun)
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsgs = errors.map((err) =>
          Object.values(err.constraints).join(', '),
        );
        throw new BadRequestException(errorMsgs.join(' && '));
      },
    }),
  );
  app.use(device.capture());
  app.useGlobalFilters(new ExceptionHandlerFilter());

  const config = new DocumentBuilder()
    .setTitle('Desert retsepts API')
    .setDescription('Desert retsepts API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on ${configService.get<number>('appConfig.port')}`);
  });
}

bootstrap();
