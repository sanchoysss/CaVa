import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Chat} from "../../models/chat/chat";
import {ChatsForUser} from "../../models/chatsForUser/chats-for-user";
import {ServiceHelper} from "../helper/service-helper";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly url: string;


  constructor(private httpClient: HttpClient,
              private serviceHelper: ServiceHelper) {
    this.url = this.serviceHelper.url + '/chat';
  }

  getChats(page: number = 0, limit: number = 50): Observable<ChatsForUser> {
    return this.httpClient.get<ChatsForUser>(
      this.url + '?page=' + page + '&limit=' + limit,
      {headers: this.serviceHelper.getAuthorizationHeader()}
    );
  }

  getChatById(id: number, page: number = 0, limit: number = 50): Observable<Chat> {
    return this.httpClient.get<Chat>(
      this.url + '/' + id + '?page=' + page + '&limit=' + limit,
      {headers: this.serviceHelper.getAuthorizationHeader()}
    );
  }

  createChat(chat: Chat): Observable<Chat> {
    return this.httpClient.post<Chat>(this.url, chat, {headers: this.serviceHelper.getAuthorizationHeader()});
  }

}
