export class UserLogin {

  private login: string;
  private password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  getLogin() : string {
    return this.login;
  }

  setLogin(login: string) {
    this.login = login;
  }

  getPassword() : string {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }
}
