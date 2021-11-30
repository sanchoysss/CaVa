export class UserForAdmin {

  id: number;
  login: String;
  name: String;
  email: String;

  constructor() {
    this.id = -1;
    this.login = this.name = this.email = '';
  }
}
