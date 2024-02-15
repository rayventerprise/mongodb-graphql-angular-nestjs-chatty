import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@ObjectType()
@Schema()
export class Message {
  @Field()
  @Prop()
  chatId: string;

  @Field()
  @Prop()
  text: string;

  @Field()
  @Prop()
  author: string;

  @Field()
  @Prop()
  createdAt: number;

  @Field()
  _id?: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
