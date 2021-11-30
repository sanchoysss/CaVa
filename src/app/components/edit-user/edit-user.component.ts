import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../service/userService/user.service';
import {UserDeleteConfirmingComponent} from '../user-delete-confirming/user-delete-confirming.component';
import {FieldsSizes} from "../../helpers/fieldsSizes/fields-sizes";
import {AccountInfo} from "../../models/accountInfo/account-info";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: AccountInfo = new AccountInfo();
  error: string | null = null;

  editForm: FormGroup = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(this.fieldsSizes.MIN_LENGTH_FOR_LOGIN),
      Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_LOGIN)
    ]),
    name: new FormControl('', [Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_NAME)]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(this.fieldsSizes.MIN_LENGTH_FOR_EMAIL),
      Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_EMAIL)]),
    description: new FormControl('', [Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_DESCRIPTION)]),
    hobbies: new FormControl('', [Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_USERS_HOBBIES)]),
    twitterLink: new FormControl('', [Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_LINK)]),
    instagramLink: new FormControl('', [Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_LINK)]),
    facebookLink: new FormControl('', Validators.maxLength(this.fieldsSizes.MAX_LENGTH_FOR_LINK))
  });

  constructor(private userService: UserService,
              private router: Router,
              public dialog: MatDialog,
              private fieldsSizes: FieldsSizes,) {
  }


  ngOnInit() {

    let id: number = +this.router.url.split("/")[3];

    if (isNaN(id) || id < 0) {
      this.router.navigate(['/404'])
    }

    this.getUser(id);
  }

  public onEdit() {
    this.user.login = this.login?.value;
    this.user.name = this.name?.value;
    this.user.email = this.email?.value;
    this.user.hobbies = this.hobbies?.value;
    this.user.description = this.description?.value;
    this.user.twitterLink = this.twitterLink?.value;
    this.user.facebookLink = this.facebookLink?.value;
    this.user.instagramLink = this.instagramLink?.value;

    this.userService.updateUser(this.user).subscribe(
      () => {
      },
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
          return;
        }
        this.error = error.error.message
      },
      () => {
        this.router.navigate(['/admin/user']);
      }
    )
  }

  public getUser(id: number) {
    this.userService.getUser(id).subscribe(
      (data: AccountInfo) => {
        this.user = data
      },
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
        } else if (error.status == 404) {
          this.router.navigate(['/404'])
        }
        else {
          console.log(error);
        }
      },
      () => {
        this.fillForm()
      }
    )
  }

  private fillForm() {
    this.login?.setValue(this.user.login);
    this.name?.setValue(this.user.name);
    this.email?.setValue(this.user.email);
    this.description?.setValue(this.user.description);
    this.hobbies?.setValue(this.user.hobbies);
    this.instagramLink?.setValue(this.user.instagramLink);
    this.facebookLink?.setValue(this.user.facebookLink);
    this.twitterLink?.setValue(this.user.twitterLink);
  }

  public deleteUser() {
    const dialogRef = this.dialog.open(UserDeleteConfirmingComponent,
      {
        width: '250px',
        position: {top: "20px"},
        panelClass: 'delete-modal'
      })

    dialogRef.afterClosed().subscribe(
      (result: boolean) => {
        if (result) {
          this.userService.deleteUser(this.user).subscribe(
            (data: any) => {
            this.router.navigate(['/admin/user']);
          },
            (error) => {
              if (error.status == 401) {
                this.userService.resolveUnauthorizedError();
              } else {
                console.log(error);
              }
            },
            () => {}
          )
        }
      });
  }

  getErrorForLogin() {
    const login = this.login;
    if (login?.hasError("required")) {
      return "Enter login";
    }

    if (login?.hasError('minlength')) {
      return 'Minimum length for login is ' + this.fieldsSizes.MIN_LENGTH_FOR_LOGIN;
    }

    if (login?.hasError('maxlength')) {
      return 'Maximum length for login is ' + this.fieldsSizes.MAX_LENGTH_FOR_LOGIN;
    }

    return ''
  }

  getErrorForEmail() {
    const email = this.email;
    if (email?.hasError('required')) {
      return 'Enter email';
    }

    if (email?.hasError('minlength')) {
      return 'Minimum length for email is ' + this.fieldsSizes.MIN_LENGTH_FOR_EMAIL;
    }

    if (email?.hasError('maxlength')) {
      return 'Maximum length for email is ' + this.fieldsSizes.MAX_LENGTH_FOR_EMAIL;
    }

    return '';
  }

  getErrorForDescription() {
    const description = this.description;
    if (description?.hasError('maxlength')) {
      return 'Maximum length for description is ' + this.fieldsSizes.MAX_LENGTH_FOR_DESCRIPTION;
    }

    return '';
  }

  getErrorForHobbies() {
    const hobbies = this.hobbies;
    if (hobbies?.hasError('maxlength')) {
      return 'Maximum length for hobbies is ' + this.fieldsSizes.MAX_LENGTH_FOR_USERS_HOBBIES;
    }

    return '';
  }

  getErrorForTwitterLink() {
    const twitterLink = this.twitterLink;
    if (twitterLink?.hasError('maxlength')) {
      return 'Maximum length for Twitter link is ' + this.fieldsSizes.MAX_LENGTH_FOR_LINK;
    }

    return '';
  }

  getErrorForFacebookLink() {
    const facebookLink = this.facebookLink;
    if (facebookLink?.hasError('maxlength')) {
      return 'Maximum length for Facebook link is ' + this.fieldsSizes.MAX_LENGTH_FOR_LINK;
    }

    return '';
  }

  getErrorForInstagramLink() {
    const instagramLink = this.instagramLink;
    if (instagramLink?.hasError('maxlength')) {
      return 'Maximum length for Instagram link is ' + this.fieldsSizes.MAX_LENGTH_FOR_LINK;
    }

    return '';
  }

  get login() {
    return this.editForm.get("login");
  }

  get name() {
    return this.editForm.get("name");
  }

  get email() {
    return this.editForm.get("email");
  }

  get description() {
    return this.editForm.get('description');
  }

  get hobbies() {
    return this.editForm.get('hobbies');
  }

  get twitterLink() {
    return this.editForm.get('twitterLink');
  }

  get instagramLink() {
    return this.editForm.get('instagramLink');
  }

  get facebookLink() {
    return this.editForm.get('facebookLink');
  }

}
