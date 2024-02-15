import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatService } from './models/chat/chats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private chatService: ChatService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async getTest(): Promise<string> {
    const newChat = await this.chatService.create({
      title: 'test',
      author: 'ray',
      publishedDate: true,
    });

    console.log(newChat);

    return 'Hello Test: ' + newChat._id;
  }
}
