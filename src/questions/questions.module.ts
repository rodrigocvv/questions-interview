import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsSchema } from './questions.schema';
import { QuestionsService } from './questions.service';

console.log('process.env.MONGO_URL => ' + process.env.MONGO_URL);

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'questions', schema: QuestionsSchema }])
    ],
    controllers: [
    ],
    providers: [
        QuestionsService
    ],
})
export class QuestionsModule { }
