import {Injectable} from '@angular/core';
import {User} from 'src/app/models/user/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserLogin} from "../../models/userLogin/user-login";
import {UserForAdmin} from "../../models/userForAdmin/user-for-admin";
import {UserRegister} from "../../models/userRegister/user-register";
import {ServiceHelper} from "../helper/service-helper";
import {UsersFoundByLoginAndName} from "../../models/usersFoundByLoginAndName/users-found-by-login-and-name";
import jwt_decode from 'jwt-decode';
import {AccountInfo} from "../../models/accountInfo/account-info";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userAdminUrl: string;
  private readonly loginUrl: string;
  private readonly signUpUrl: string;
  private readonly userUrl: string;

  constructor(private http: HttpClient,
              private serviceHelper: ServiceHelper,
              private router: Router,) {
    this.userAdminUrl = this.serviceHelper.url + '/admin/user';
    this.loginUrl = this.serviceHelper.url + '/login';
    this.signUpUrl = this.serviceHelper.url + '/sign-up';
    this.userUrl = this.serviceHelper.url + '/user';
  }

  public getUsers(): Observable<AccountInfo[]> {
    return this.http.get<AccountInfo[]>(this.userAdminUrl, {headers: this.serviceHelper.getAuthorizationHeader()});
  }

  public addUser(user: UserRegister): Observable<UserForAdmin> {
    return this.http.post<UserForAdmin>(this.userAdminUrl, user, {headers: this.serviceHelper.getAuthorizationHeader()});
  }

  public getUser(id: number): Observable<AccountInfo> {
    return this.http.get<AccountInfo>(this.userAdminUrl + "/" + id, {headers: this.serviceHelper.getAuthorizationHeader()});
  }

  public updateUser(user: AccountInfo): Observable<AccountInfo> {
    return this.http.put<AccountInfo>(this.userAdminUrl + "/" + user.id, user, {headers: this.serviceHelper.getAuthorizationHeader()});
  }

  public deleteUser(user: UserForAdmin) {
    return this.http.delete(this.userAdminUrl + "/" + user.id, {headers: this.serviceHelper.getAuthorizationHeader()});
  }

  public loginUser(userLogin: UserLogin): Observable<User> {
    return this.http.post<User>(this.loginUrl, userLogin);
  }

  public registerUser(user: UserRegister): Observable<User> {
    return this.http.post<User>(this.signUpUrl, user);
  }

  public findUser(subString: String): Observable<UsersFoundByLoginAndName> {
    return this.http.get<UsersFoundByLoginAndName>(
      this.userUrl + '/find/' + subString,
      {headers: this.serviceHelper.getAuthorizationHeader()}
    )
  }

  public isAuth(): boolean {
    const token = localStorage.getItem("token");
    return token != null;
  }

  public getRole() {
    try {
      let decodedToken: any = this.getDecodedToken();
      if (decodedToken != null) {
        return decodedToken.role;
      } else {
        return 'None';
      }
    } catch (e) {
      console.log(e);
    }
  }

  public resolveUnauthorizedError() {
    this.serviceHelper.removeUserData();
    this.router.navigateByUrl('/login');
  }

  public getLogin() {
    let decodedToken: any = this.getDecodedToken();
    return decodedToken.sub;
  }

  private getDecodedToken() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return jwt_decode(token);
    }
    return null;
  }
}
