import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class QuestionDTO {
  _id?: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "Questions description", required: true })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "Questions answer", required: true })
  answer: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "Questions type", required: true })
  type: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "Questions subject", required: true })
  subject: string;
}