export class ChatMember {

  id: number;
  name: string;
  login: string;


  constructor(
    login: string = '',
    name: string = '',
    id: number = -1
  ) {
    this.id = id;
    this.name = name;
    this.login = login;
  }
}
