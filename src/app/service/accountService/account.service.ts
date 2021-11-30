import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServiceHelper} from "../helper/service-helper";
import {Observable} from 'rxjs';
import {AccountInfo} from "../../models/accountInfo/account-info";
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly url: string = this.serviceHelper.url + '/account';

  constructor(private http: HttpClient,
              private serviceHelper: ServiceHelper,) {
  }

  public getAccountInfo(login: string): Observable<AccountInfo> {
    return this.http.get<AccountInfo>(this.url + '/' + login, {headers: this.serviceHelper.getAuthorizationHeader()})
  }

  public updateAccountInfo(accountInfo: AccountInfo): Observable<User> {
    return this.http.put<User>(this.url, accountInfo, {headers: this.serviceHelper.getAuthorizationHeader()});
  }
}
