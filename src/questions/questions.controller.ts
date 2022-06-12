import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    @Get(':id')
    @ApiOperation({ summary: 'Returns one question by id' })
    @ApiResponse({ status: 204 })
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

}