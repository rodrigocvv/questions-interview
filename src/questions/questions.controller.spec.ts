import { HttpException } from '@nestjs/common';
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

    it('should find a random question by subject', async () => {
        const questionDB: QuestionDTO = {
            _id: '123',
            description: 'test description',
            answer: 'test answer',
            subject: 'test subject',
            type: 'test type'
        }
        jest.spyOn(questionsService, 'findBySubject').mockResolvedValue([questionDB]);
        const question = await questionsController.getRandomQuestion('test subject');
        expect(question).not.toBeNull();
    });

    it('should find a random question', async () => {
        const questionDB: QuestionDTO = {
            _id: '123',
            description: 'test description',
            answer: 'test answer',
            subject: 'test subject',
            type: 'test type'
        }
        jest.spyOn(questionsService, 'findAll').mockResolvedValue([questionDB]);
        const question = await questionsController.getRandomQuestion('0');
        expect(question).not.toBeNull();
    });

    it('should not find by a random question', async () => {
        jest.spyOn(questionsService, 'findAll').mockResolvedValue([]);
        try {
            await questionsController.getRandomQuestion('0');
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
        }
    });

    it('should get a list of all subjects', async () => {
        const questionDB: QuestionDTO = {
            _id: '123',
            description: 'test description',
            answer: 'test answer',
            subject: 'test subject',
            type: 'test type'
        }
        jest.spyOn(questionsService, 'findAll').mockResolvedValue([questionDB]);
        const subjectsList = await questionsController.getAllSubjects();
        expect(subjectsList[0]).toEqual(questionDB.subject);
    });    

    it('should not get list of subjects', async () => {
        jest.spyOn(questionsService, 'findAll').mockResolvedValue([]);
        try {
            await questionsController.getAllSubjects();
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
        }
    });    

    it('should delete a question by id', async () => {
        jest.spyOn(questionsService, 'delete').mockResolvedValue(undefined);
        await expect(questionsController.delete('123')).resolves.not.toThrow();
    });

});
