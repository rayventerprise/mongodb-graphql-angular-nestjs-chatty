import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChatInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  publishedDate: boolean;
}
