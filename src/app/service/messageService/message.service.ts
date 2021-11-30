import { Injectable } from '@angular/core';
import {ServiceHelper} from "../helper/service-helper";
import {Message} from "../../models/message/message";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly url: string;

  constructor(
    private serviceHelper: ServiceHelper,
    private httpClient: HttpClient,
  ) {
    this.url = serviceHelper.url + '/message';
  }

  public getMessages(chatId: number, page: number = 0, limit: number = 50): Observable<Message[]> {
    return this.httpClient.get<Message[]>(
      this.url + '/' + chatId + "?page=" + page + "&limit=" + limit,
      {headers: this.serviceHelper.getAuthorizationHeader()}
    );
  }
}
