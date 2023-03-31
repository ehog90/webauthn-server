import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('NestJS Webauthn Demo')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: 'http://localhost:3002',
    credentials: true,
  });
  await app.listen(5005);
}
bootstrap();
