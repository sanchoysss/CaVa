import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class ServiceHelper {

  private readonly _protocol = 'http';
  private readonly _host = 'localhost';
  private readonly _port = '8088';

  constructor() {
  }

  public getAuthorizationHeader(): HttpHeaders {
    const token: string | null = localStorage.getItem("token");
    return new HttpHeaders({"Authorization" : "Bearer " + token});
  }

  public saveUserData(user: User) {
    localStorage.setItem("token", user.token);
    localStorage.setItem('name', user.name);
  }

  public removeUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  get protocol() {
    return this._protocol;
  }

  get host() {
    return this._host;
  }

  get port() {
    return this._port;
  }

  get url() {
    return this._protocol + '://' + this._host + ':' + this._port
  }
}
