import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserLogin} from "../../models/userLogin/user-login";
import {UserService} from "../../service/userService/user.service";
import {User} from "../../models/user/user";
import {ServiceHelper} from "../../service/helper/service-helper";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  minLengthForLogin;
  minLengthForPassword;
  hide;

  error: string | null;

  loginForm;

  constructor(private userService: UserService,
              private serviceHelper: ServiceHelper,
              private router: Router) {
    this.minLengthForLogin = 2;
    this.minLengthForPassword = 8;
    this.hide = true;

    this.error = null;

    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(this.minLengthForLogin)]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minLengthForPassword)])
    });
  }

  loginUser() {
    let login: string = this.loginForm.get("login")?.value;
    let password: string = this.loginForm.get("password")?.value;

    let userLogin: UserLogin = new UserLogin(login, password);

    this.userService.loginUser(userLogin).subscribe(
      (user: User) => { this.serviceHelper.saveUserData(user) },
      (error) => { this.error = error.error.message; },
      () => {this.router.navigate(['/chat'])}
    );
  }

  getErrorForLogin() {
    if (this.loginForm.get("login")?.hasError("required")) {
      return "Enter login";
    }

    return this.loginForm.get("login")?.hasError("minLength") ? "Min length for login is " + this.minLengthForLogin : "";
  }

  getErrorForPassword() {
    if (this.loginForm.get("password")?.hasError("required")) {
      return "Enter password";
    }

    return this.loginForm.get("password")?.hasError("minLength")? "Min length for password is " + this.minLengthForPassword : "";
  }

  get login() {
    return this.loginForm.get("login");
  }

  get password() {
    return this.loginForm.get("password");
  }

}
