import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  configSwagger(app);
  await app.listen(3000);
}

function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Interview Questions')
    .setDescription('API Interview Questions')
    .setVersion('1.0')
    .addTag('questions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

bootstrap();
