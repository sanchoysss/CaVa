import {MessageType} from "./message-type/message-type";

export class Message {

  text: string;
  sendingDate: string;
  messageType: MessageType;

  constructor(text: string = "",
              date : string = new Date().toISOString().replace('Z', ''),
              messageType: MessageType = MessageType.OUTGOING
  ) {
    this.text = text;
    this.sendingDate = date;
    this.messageType = messageType;
  }

}
