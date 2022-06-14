import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  configSwagger(app);
  await app.listen(port);
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
