export interface Chat {
  title: string;
  _id: string;
}

export interface Message {
  chatId: string;
  text: string;
}
