import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field()
  chatId: string;

  @Field()
  text: string;

  @Field()
  author: string;

  @Field()
  createdAt: boolean;
}
