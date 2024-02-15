import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Chat } from './chat.model';
import { ChatService } from './chats.service';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [Chat])
  async chats(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @Query(() => Chat)
  async chat(@Args('id', { type: () => ID }) id: string): Promise<Chat> {
    return this.chatService.findOne(id);
  }

  @Mutation(() => Chat)
  async createChat(
    @Args('title') title: string,
    @Args('author') author: string,
  ): Promise<Chat> {
    return this.chatService.create({ title, author, publishedDate: true });
  }
}
