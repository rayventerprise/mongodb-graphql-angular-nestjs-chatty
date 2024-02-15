import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Chat} from "../../../types";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

const CREATE_CHAT = gql`
  mutation CreateChat($author: String!, $title: String!) {
    createChat(author: $author, title: $title) {
      author
      title
    }
  }
`;

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = [];
  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            chats {
              _id
              title
              author
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result.data.chats)
        this.chats = result.data?.chats;
      });
  }

  createChat() {
    const title = 'Test From Clientside'
    const author = 'Some User'

    this.apollo
      .mutate({
        mutation: CREATE_CHAT,
        variables: { title, author },
        optimisticResponse: {
          __typename: 'Mutation',
          createChat: {
            __typename: 'Chat',
            author,
            title,
          },
        },
      })
      .subscribe((result: any) => {
          this.chats = [...this.chats, result.data.createChat];
      });
  }
}
