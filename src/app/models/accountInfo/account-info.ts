import {DatePipe} from '@angular/common';

export class AccountInfo {

  id: number;
  login: string;
  name: string;
  email: string;
  description: string;
  hobbies: string;
  twitterLink: string;
  instagramLink: string;
  facebookLink: string;
  registrationDate: string;
  role: string;

  constructor(
    id: number = -1,
    login: string = 'invalidLogin',
    name: string = 'invalidName',
    email: string = 'invalidEmail',
    description: string = '',
    hobbies: string = '',
    twitterLink: string = '',
    instagramLik: string = '',
    facebookLink: string = '',
    registrationDate: string = '',
    role: string = '',)

  {
    this.id = id;
    this.login = login;
    this.name = name;
    this.email = email;
    this.description = description;
    this.hobbies = hobbies;
    this.twitterLink = twitterLink;
    this.instagramLink = instagramLik;
    this.facebookLink = facebookLink;
    this.registrationDate = registrationDate;
    this.role = role;
  }

  get registerDate() {
    let datePipe = new DatePipe(new Date().toISOString());
    return datePipe.transform(this.registrationDate, 'dd MMMM, yyyy', '0', 'en-US');
  }
}
