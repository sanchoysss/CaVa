import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../service/userService/user.service';
import {UserRegister} from "../../models/userRegister/user-register";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  myForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      name: new FormControl(''),
      password: new FormControl('',
        [Validators.required,
          Validators.minLength(8)]
      ),
      email: new FormControl('',
        [Validators.required,
          Validators.email])
    });
  }

  public onSubmit() {

    let user: UserRegister = new UserRegister();

    user.login = this.login?.value;
    user.name = this.getName();
    user.password = this.password?.value;
    user.email = this.email?.value;

    this.userService.addUser(user).subscribe(
      () => {
        this.router.navigate(['/user']);
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
    );

  }

  getName(): string {
    return this.name?.value == '' ? this.login?.value : this.name?.value;
  }


  get login() {
    return this.myForm.get('login');
  }

  get name() {
    return this.myForm.get("name");
  }

  get password() {
    return this.myForm.get("password");
  }

  get email() {
    return this.myForm.get("email");
  }

}
