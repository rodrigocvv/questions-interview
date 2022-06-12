import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsSchema } from './questions.schema';
import { QuestionsService } from './questions.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'questions', schema: QuestionsSchema }])
    ],
    controllers: [
        QuestionsController
    ],
    providers: [
        QuestionsService
    ],
})
export class QuestionsModule { }
