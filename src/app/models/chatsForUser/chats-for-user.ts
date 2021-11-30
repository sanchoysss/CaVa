import {Chat} from "../chat/chat";
import {ChatUser} from "../chatUser/chat-user";

export class ChatsForUser {

  chatsReceiver: ChatUser;
  chatsDto: Chat[];

  constructor(chatsReceiver: ChatUser = new ChatUser(),
              chatsDto: Chat[] = [],
  ) {
    this.chatsReceiver = chatsReceiver;
    this.chatsDto = chatsDto;
  }
}
