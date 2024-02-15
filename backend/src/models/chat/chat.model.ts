import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@ObjectType()
@Schema()
export class Chat {
  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  author: string;

  @Field()
  @Prop()
  publishedDate: boolean;

  @Field()
  _id?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
