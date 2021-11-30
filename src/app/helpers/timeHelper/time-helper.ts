import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Chat} from "../../models/chat/chat";
import {Message} from "../../models/message/message";

@Injectable({
  providedIn: 'root'
})
export class TimeHelper {

  private datePipe = new DatePipe('');

  constructor() {
  }

  getDateForUser(isoDate: string): Date {
    let oldDate: Date = new Date(isoDate);
    let newDate: Date = new Date(oldDate);
    const currentTimeZoneOffset = new Date().getTimezoneOffset();
    newDate.setTime(oldDate.getTime() - currentTimeZoneOffset * 60 * 1000);
    return newDate;
  }

  getDateForLastMessage(isoDate: string) {
    let sendingTime = new Date(this.getDateForUser(isoDate));
    let currentTime = new Date();

    if (currentTime.getTime() - sendingTime.getTime() < 1000 * 60 * 60 * 24) {
      return this.datePipe.transform(this.getDateForUser(isoDate), 'hh:mm aa', '0', 'en-US');
    }

    if (currentTime.getTime() - sendingTime.getTime() < 1000 * 60 * 60 * 24 * 7) {
      return this.datePipe.transform(this.getDateForUser(isoDate), 'EEEE', '0', 'en-US');
    }

    return this.datePipe.transform(this.getDateForUser(isoDate), 'dd.MM.yyyy', '0', 'en-US');
  }

  getDateForMessage(isoDate: string) {
    return this.datePipe.transform(this.getDateForUser(isoDate), 'hh:mm | MMM dd', '0', 'en-US');
  }

  getDateOfLastMessage(chat: Chat): string | null {
    let lastMessage = this.getLastMessage(chat);

    if (lastMessage == undefined) {
      return '';
    }

    return this.getDateForLastMessage(chat.messages[chat.messages.length - 1].sendingDate);
  }

  getLastMessage(chat: Chat): Message | undefined {
    if (chat.messages.length == 0) {
      return undefined
    }

    return chat.messages[chat.messages.length - 1];
  }

}
