import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../service/accountService/account.service";
import {AccountInfo} from "../../models/accountInfo/account-info";
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {UserService} from "../../service/userService/user.service";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit{


  accountInfo: AccountInfo | null = null;

  constructor(private accountService: AccountService,
              private router: Router,
              public userService: UserService,) { }

  ngOnInit(): void {
    let login = this.router.url.split('/')[2];
    this.accountService.getAccountInfo(login).subscribe(
      (accountInfo: AccountInfo) => {this.accountInfo = accountInfo; console.log(accountInfo)},
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
        } else {
          console.log(error);
        }
      },
      () => {}
    );
  }

  getEmail() : string {
    return this.accountInfo?.email == undefined ? '' : this.accountInfo?.email;
  }

  getDescription(): string {
    let defaultString = "This user didn't write any description";

    return this.accountInfo == null || this.accountInfo.description == null ? defaultString : this.accountInfo.description;
  }

  getHobbies(): string {
    let defaultHobbies = 'This user didn\'t write any hobbies';
    return this.accountInfo == null || this.accountInfo.hobbies == null || this.accountInfo.hobbies.trim() == '' ?
      defaultHobbies :
      'Hobbies: ' + this.accountInfo.hobbies;
  }

  editProfile() {
    this.router.navigate(['account/edit']);
  }

  getRegistrationDate() {
    let datePipe = new DatePipe(new Date().toISOString());
    console.log(datePipe.transform(this.accountInfo?.registrationDate, 'dd MMMM, yyyy', '0', 'en-US'))
    return datePipe.transform(this.accountInfo?.registrationDate, 'dd MMMM, yyyy', '0', 'en-US');
  }

}
