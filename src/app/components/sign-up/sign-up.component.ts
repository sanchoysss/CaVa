import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserRegister} from "../../models/userRegister/user-register";
import {UserService} from "../../service/userService/user.service";
import {User} from "../../models/user/user";
import { Router } from '@angular/router';
import {ServiceHelper} from "../../service/helper/service-helper";
import {FieldsSizes} from "../../helpers/fieldsSizes/fields-sizes";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  minLengthForLogin;
  minLengthForPassword;

  error: string | null;

  hide = true;

  registerForm;

  constructor(private userService: UserService,
              private serviceHelper: ServiceHelper,
              private router: Router,
              private fieldsSizes: FieldsSizes) {
    this.minLengthForLogin = 2;
    this.minLengthForPassword = 8;

    this.error = null;

    this.registerForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(this.fieldsSizes.MIN_LENGTH_FOR_LOGIN), Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_LOGIN)]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.fieldsSizes.MIN_LENGTH_FOR_PASSWORD), Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_PASSWORD)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(this.fieldsSizes.MIN_LENGTH_FOR_EMAIL), Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_EMAIL)]),
      name: new FormControl('', [Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_NAME)])
    });
  }

  registerUser() {
    let userRegister: UserRegister = new UserRegister();

    userRegister.login = this.login?.value
    userRegister.email = this.email?.value;
    userRegister.name = this.getName();
    userRegister.password = this.password?.value;
    let datePipe = new DatePipe('');
    let dateStr = datePipe.transform(new Date().toISOString(), 'yyyy-MM-dd', '0', 'en-US');
    userRegister.registrationDate = dateStr == undefined ? '' : dateStr;
    console.log(userRegister);


    this.userService.registerUser(userRegister).subscribe(
      (user: User) => { this.serviceHelper.saveUserData(user) },
      (error) => { this.error = error.error.message; },
      () => {this.router.navigate(['/chat'])}
    )
  }

  getName(): string {
    return this.name?.value == '' ? this.login?.value : this.name?.value;
  }

  getErrorForLogin() {
    if (this.login?.hasError("required")) {
      return "Enter login";
    }

    if (this.login?.hasError('minlength')) {
      return 'Minimum length for login is ' + this.fieldsSizes.MIN_LENGTH_FOR_LOGIN;
    }

    if (this.login?.hasError('maxlength')) {
      return 'Maximum length for login is ' + this.fieldsSizes.MAX_LENGTH_FOR_LOGIN
    }

    return '';
  }

  getErrorForName() {
    if (this.name?.hasError('maxlength')) {
      return 'Maximum length for name is ' + this.fieldsSizes.MAX_LENGTH_FOR_NAME;
    }

    return '';
  }

  getErrorForPassword() {
    if (this.password?.hasError("required")) {
      return "Enter password";
    }

    if (this.password?.hasError('minlength')) {
      return 'Minimum length for password is ' + this.fieldsSizes.MIN_LENGTH_FOR_PASSWORD;
    }

    if (this.password?.hasError('maxlength')) {
      return 'Maximum length for password is ' + this.fieldsSizes.MAX_LENGTH_FOR_PASSWORD;
    }

    return this.registerForm.get("password")?.hasError("minlength")? "Min length for password is " + this.minLengthForPassword : "";
  }

  getErrorForEmail() {
    if (this.email?.hasError("required")) {
      return "Enter email";
    }

    if (this.email?.hasError('minlength')) {
      return 'Minimum length for email is ' + this.fieldsSizes.MIN_LENGTH_FOR_EMAIL;
    }

    if (this.email?.hasError('maxlength')) {
      return 'Maximum length for email is ' + this.fieldsSizes.MAX_LENGTH_FOR_EMAIL;
    }

    if (this.email?.hasError('email')) {
      return "Email is invalid";
    }

    return '';
  }

  get login() {
    return this.registerForm.get("login");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get name() {
    return this.registerForm.get("name");
  }

}
