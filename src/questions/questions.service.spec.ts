import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { QuestionDTO } from './questions.model';
import { QuestionsSchema } from './questions.schema';
import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
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
            controllers: [],
            providers: [QuestionsService],
        }).compile();
        questionsService = moduleRef.get<QuestionsService>(QuestionsService);
    });

    afterAll(async () => {
        await moduleRef.close();
        await mongodb.stop();
    });

    it('should be defined', () => {
        expect(questionsService).toBeDefined();
    });

    let questionDB: QuestionDTO;

    it('should create a new question', async () => {
        const question: QuestionDTO = {
            description: 'test description',
            answer: 'test answer',
            subject: 'test subject',
            type: 'test type'
        }
        questionDB = await questionsService.create(question);
        expect(questionDB._id).not.toBeNull();
    });

    it('should find by id', async () => {
        questionDB = await questionsService.findById(questionDB._id);
        expect(questionDB._id).not.toBeNull();
    });

    it('should delete', async () => {
        await expect(questionsService.delete(questionDB)).resolves.not.toThrow();
    });
});
