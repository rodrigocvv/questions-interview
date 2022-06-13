import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import {
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
    ApiTags,
    getSchemaPath
} from '@nestjs/swagger';
import { QuestionDTO } from './questions.model';
import { QuestionsService } from './questions.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {

    constructor(private questionsService: QuestionsService) { }

    @Post()
    @ApiOperation({ summary: 'Create new question' })
    async create(@Body() questionDTO: QuestionDTO) {
        this.questionsService.create(questionDTO);
    }

    @ApiExtraModels(QuestionDTO)
    @ApiResponse({
        status: 200,
        schema: {
            $ref: getSchemaPath(QuestionDTO),
        },
    })

    @ApiOperation({ summary: 'Returns one question by id' })
    @ApiResponse({ status: 204 })
    @Get(':id')
    async findById(@Param('id') id: string): Promise<QuestionDTO> {
        return await this.questionsService.findById(id)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a question' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 204 })
    async delete(@Param('id') id: string) {
        await this.questionsService.delete(id);
    }

    @ApiOperation({ summary: 'Returns one random question by subject', description: 'Use 0 for all subjects' })
    @ApiResponse({ status: 204 })
    @Get('random/:subject')
    async getRandomQuestion(@Param('subject') subject: string): Promise<QuestionDTO> {
        const questionsList: QuestionDTO[] = !subject || subject === '0' ? await this.questionsService.findAll() : await this.questionsService.findBySubject(subject);
        const selectedQuestion: QuestionDTO = questionsList[Math.floor(Math.random() * questionsList.length)];
        if (!selectedQuestion) {
            throw new HttpException('No data', HttpStatus.NO_CONTENT);
        }
        return selectedQuestion;
    }

    @ApiOperation({ summary: 'Returns one random question by subject', description: 'Use 0 for all subjects' })
    @ApiResponse({ status: 204 })
    @ApiResponse({
        status: 200,
        type: String,
        isArray: true
    })    
    @Get('subjects/all')
    async getAllSubjects(): Promise<String[]> {
        const questionsList: QuestionDTO[] = await this.questionsService.findAll();
        if (!questionsList || questionsList.length === 0) {
            throw new HttpException('No data', HttpStatus.NO_CONTENT);
        }
        return [...new Set(questionsList.map(question => question.subject))];
    }    

}