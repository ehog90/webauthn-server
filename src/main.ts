import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS Webauthn Demo')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: 'http://localhost:5005',
    credentials: true,
  });
  await app.listen(5005);
}
bootstrap();
