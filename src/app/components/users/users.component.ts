import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/userService/user.service';
import {AccountInfo} from "../../models/accountInfo/account-info";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users?: AccountInfo[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe(
      (data: AccountInfo[]) => {
        this.users = data;
      },
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
        } else {
          console.log(error);
        }
      },
      () => {
      }
    )
  }

}
