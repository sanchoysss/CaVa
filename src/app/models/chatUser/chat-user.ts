export class ChatUser {
  id: number;
  login: string;
  name: string;

  constructor(
    login: string = '',
    name: string = '',
    id: number = -1
  ) {
    this.id = id;
    this.login = login;
    this.name = name;
  }
}
