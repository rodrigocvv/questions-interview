import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { QuestionsController } from './questions.controller';
import { QuestionDTO } from './questions.model';
import { QuestionsSchema } from './questions.schema';
import { QuestionsService } from './questions.service';

describe('QuestionsController', () => {
    let questionsController: QuestionsController;
    let questionsService: QuestionsService;
    let mongodb: MongoMemoryServer;
    let moduleRef: TestingModule;

    beforeAll(async () => {
        mongodb = await MongoMemoryServer.create()
        const mongoUri = mongodb.getUri();
        moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(mongoUri),
                MongooseModule.forFeature([{ name: 'questions', schema: QuestionsSchema }])
            ],
            controllers: [QuestionsController],
            providers: [QuestionsService],
        }).compile();
        questionsService = moduleRef.get<QuestionsService>(QuestionsService);
        questionsController = moduleRef.get<QuestionsController>(QuestionsController);
    });

    afterAll(async () => {
        await moduleRef.close();
        await mongodb.stop();
    });

    it('service should be defined', () => {
        expect(questionsService).toBeDefined();
    });

    it('controller should be defined', () => {
        expect(questionsController).toBeDefined();
    });

    it('should create a new question', async () => {
        const question: QuestionDTO = {
            description: 'test description',
            answer: 'test answer',
            subject: 'test subject',
            type: 'test type'
        }
        const questionDB: QuestionDTO = {
            _id: '123',
            description: 'test description',
            answer: 'test answer',
            subject: 'test subject',
            type: 'test type'
        }
        jest.spyOn(questionsService, 'create').mockResolvedValue(questionDB);
        await expect(questionsController.create(question)).resolves.not.toThrow();
    });

    it('should find a question by id', async () => {
        const questionDB: QuestionDTO = {
            _id: '123',
            description: 'test description',
            answer: 'test answer',
            subject: 'test subject',
            type: 'test type'
        }
        jest.spyOn(questionsService, 'findById').mockResolvedValue(questionDB);
        await expect(questionsController.findById('123')).resolves.not.toThrow();
    });

    it('should delete a question by id', async () => {
        jest.spyOn(questionsService, 'delete').mockResolvedValue(undefined);
        await expect(questionsController.delete('123')).resolves.not.toThrow();
    });

});
