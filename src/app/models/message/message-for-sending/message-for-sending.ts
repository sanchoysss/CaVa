import {Message} from "../message";
import {MessageType} from "../message-type/message-type";
import {ChatUser} from "../../chatUser/chat-user";

export class MessageForSending extends Message{

  userSender: ChatUser;
  //userReceiver: ChatUser;
  chatReceiverId: number;

  constructor(text: string = '',
              userSender: ChatUser = new ChatUser(),
              //userReceiver: ChatUser = new ChatUser(),
              chatReceiverId: number = -1,
              date: string = new Date().toISOString().replace('Z', ''),
              messageType: MessageType = MessageType.OUTGOING
  ) {
    super(text, date, messageType);
    this.userSender = userSender;
    //this.userReceiver = userReceiver;
    this.chatReceiverId = chatReceiverId;
  }

}
