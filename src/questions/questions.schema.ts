import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionDocument = Question & Document;
@Schema()
export class Question {

  _id: string;

  @Prop()
  description: string;

  @Prop()
  answer: string;

  @Prop()
  type: string;

  @Prop()
  subject: string;

}

export const QuestionsSchema = SchemaFactory.createForClass(Question);