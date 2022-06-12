import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { LoggerInterceptor } from './logger.interceptor';
import { QuestionsModule } from './questions/questions.module';
import { winstonConfig } from './winston.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    WinstonModule.forRoot(winstonConfig),
    QuestionsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule { }
