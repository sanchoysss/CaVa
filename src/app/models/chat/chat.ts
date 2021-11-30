import {ChatMember} from "../chatMember/chat-member";
import {Message} from "../message/message";

export class Chat {

  id: number;
  name: string;
  loadMoreEnabled: boolean = true;
  currentPageForMessages: number;
  chatMembers: ChatMember[];
  messages: Message[];

  constructor(chatMembers: ChatMember[] = [],
              name: string = '',
              _messages: Message[] = [],
              currentPageForMessages: number = -1,
              id: number = -1,
  ) {
    this.id = id;
    this.name = name;
    this.chatMembers = chatMembers;
    this.messages = _messages;
    this.currentPageForMessages = currentPageForMessages;
  }
}
