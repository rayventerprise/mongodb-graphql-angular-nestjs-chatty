import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  async messages(@Args('chatId', { type: () => ID }) chatId: string): Promise<Message[]> {
    return this.messageService.findAll(chatId);
  }

  @Query(() => Message)
  async message(@Args('id', { type: () => ID }) id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  async createMessage(
    @Args('chatId') chatId: string,
    @Args('text') text: string,
    @Args('author') author: string,
  ): Promise<Message> {
    return this.messageService.create({
      text,
      author,
      chatId,
      createdAt: Date.now(),
    });
  }
}
