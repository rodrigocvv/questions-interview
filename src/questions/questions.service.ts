import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionDTO } from './questions.model';
import { QuestionDocument } from './questions.schema';

@Injectable()
export class QuestionsService {

    constructor(@InjectModel('questions') private questionModel: Model<QuestionDocument>) { }

    async create(questionDTO: QuestionDTO): Promise<QuestionDTO> {
        const question: QuestionDocument = await (new this.questionModel(questionDTO)).save();
        return this.getDTO(question);
    }

    async findById(_id: string): Promise<QuestionDTO> {
        let question: QuestionDocument;
        try {
            question = await this.questionModel.findById(_id);
        } catch (e) {
            throw new HttpException('No data', HttpStatus.NO_CONTENT);
        }
        return this.getDTO(question);
    }

    async delete(id: string): Promise<void> {
        try {
            await this.questionModel.deleteOne({ _id: id });
        } catch (e) {
            throw new HttpException('No data', HttpStatus.NO_CONTENT);
        }
    }

    private getDTO(question: QuestionDocument): QuestionDTO {
        return {
            _id: question._id,
            answer: question.answer,
            description: question.description,
            subject: question.subject,
            type: question.type
        };
    }

}