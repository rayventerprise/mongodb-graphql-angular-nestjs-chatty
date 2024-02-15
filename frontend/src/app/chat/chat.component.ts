import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {ActivatedRoute} from "@angular/router";
import {Chat, Message} from "../../../types";
import {NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

const CREATE_MESSAGE = gql`
  mutation CreateMessage($author: String!, $text: String!, $chatId: String!) {
    createMessage(author: $author, text: $text, chatId: $chatId) {
      text
      author
    }
  }
`;

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgIf,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  chatId: string = '';
  chat: Chat|null = null;
  messageText: string = '';
  messages: Message[] = [];
  constructor(private apollo: Apollo, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(({id}) => this.loadChat(id));
  }
  loadChat(chatId: string): void {
    this.chatId = chatId;

    this.apollo
      .watchQuery({
        query: gql`
          query Chat($id: ID!) {
            chat(id: $id) {
              title
              author
            }
          }
        `,
        variables: { id: chatId }
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result.data.chat)
        this.chat = result.data?.chat;
      });
  }

  createMessage() {
    console.log(this.messageText);

    this.apollo
      .mutate({
        mutation: CREATE_MESSAGE,
        variables: { chatId: this.chatId, author: 'Ray', text: this.messageText },
        optimisticResponse: {
          __typename: 'Mutation',
          createMessage: {
            __typename: 'Message',
            text: this.messageText,
            author: 'Ray',
          },
        },
      })
      .subscribe((result: any) => {
        this.messageText = '';
        this.messages = [...this.messages, result.data.createMessage];
      });
  }
}
