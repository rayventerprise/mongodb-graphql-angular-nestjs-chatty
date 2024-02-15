import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageResolver } from './message.resolver';
import { Message, MessageSchema } from './message.model';
import { MessageService } from './message.service';

@Module({
  providers: [MessageService, MessageResolver],
  exports: [MessageService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
})
export class MessagesModule {}
