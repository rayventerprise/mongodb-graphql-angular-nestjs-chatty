import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chats.service';
import { ChatResolver } from './chat.resolver';
import { Chat, ChatSchema } from './chat.model';

@Module({
  providers: [ChatService, ChatResolver],
  exports: [ChatService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      },
    ]),
  ],
})
export class ChatsModule {}
