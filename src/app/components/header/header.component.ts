import { Component } from '@angular/core';
import {UserService} from "../../service/userService/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public userService: UserService,
              private router: Router) {
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  showChats() {
    this.router.navigate(['chat']);
  }

  getUsersName() {
    return localStorage.getItem('name');
  }

  getAccountInfo() {
    this.router.navigate(['/account/' + this.userService.getLogin()]);
  }

  showAboutPage() {
    this.router.navigate(['/about']);
  }

  showAdminPage() {
    this.router.navigate(['admin/user']);
  }
}
