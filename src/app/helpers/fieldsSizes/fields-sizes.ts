import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldsSizes {

  readonly MAX_LENGTH_FOR_NAME: number = 50;

  readonly MIN_LENGTH_FOR_LOGIN: number = 2;
  readonly MAX_LENGTH_FOR_LOGIN: number = 50;

  readonly MIN_LENGTH_FOR_PASSWORD: number = 8;
  readonly MAX_LENGTH_FOR_PASSWORD: number = 50;

  readonly MIN_LENGTH_FOR_EMAIL: number = 10;
  readonly MAX_LENGTH_FOR_EMAIL: number = 100;

  readonly MIN_LENGTH_FOR_MESSAGE_TEXT: number = 1;
  readonly MAX_LENGTH_FOR_MESSAGE_TEXT: number = 10000;

  readonly MAX_LENGTH_FOR_DESCRIPTION: number = 10000;
  readonly MAX_LENGTH_FOR_USERS_HOBBIES: number = 10000;

  readonly MAX_LENGTH_FOR_LINK: number = 200;

}
