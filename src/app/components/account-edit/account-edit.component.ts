import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../service/accountService/account.service";
import {AccountInfo} from "../../models/accountInfo/account-info";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ServiceHelper} from "../../service/helper/service-helper";
import {User} from "../../models/user/user";
import {FieldsSizes} from "../../helpers/fieldsSizes/fields-sizes";
import {UserService} from "../../service/userService/user.service";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  error: string | null = null;
  oldAccData: AccountInfo;
  newAccData: FormGroup = new FormGroup({
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

  constructor(private accountService: AccountService,
              private serviceHelper: ServiceHelper,
              private router: Router,
              private fieldsSizes: FieldsSizes,
              private userService: UserService,) {
  }

  ngOnInit(): void {
    this.accountService.getAccountInfo(this.userService.getLogin()).subscribe(
      (accountInfo: AccountInfo) => {
        this.oldAccData = accountInfo
      },
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
        } else {
          console.log(error);
        }
      },
      () => {
        this.fillForm()
      }
    );
  }

  fillForm() {
    this.newAccData.get('login')?.setValue(this.oldAccData.login.trim());
    this.newAccData.get('name')?.setValue(this.oldAccData.name.trim());
    this.newAccData.get('email')?.setValue(this.oldAccData.email.trim());
    this.newAccData.get('description')?.setValue(this.oldAccData.description.trim());
    this.newAccData.get('hobbies')?.setValue(this.oldAccData.hobbies.trim());
    this.newAccData.get('twitterLink')?.setValue(this.oldAccData.twitterLink.trim());
    this.newAccData.get('instagramLink')?.setValue(this.oldAccData.instagramLink.trim());
    this.newAccData.get('facebookLink')?.setValue(this.oldAccData.facebookLink.trim());
  }

  saveChanges() {
    this.accountService.updateAccountInfo(this.getNewAccountInfo()).subscribe(
      (user: User) => {
        this.serviceHelper.saveUserData(user)
      },
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
          return;
        }
        this.error = error.error.message;
      },
      () => {
        this.router.navigate(['/account/' + this.userService.getLogin()]);
      }
    );
  }

  getNewAccountInfo(): AccountInfo {
    return new AccountInfo(
      this.oldAccData.id,
      this.newAccData.get('login')?.value.trim(),
      this.getNewName().trim(),
      this.newAccData.get('email')?.value.trim(),
      this.newAccData.get('description')?.value.trim(),
      this.newAccData.get('hobbies')?.value.trim(),
      this.newAccData.get('twitterLink')?.value.trim(),
      this.newAccData.get('instagramLink')?.value.trim(),
      this.newAccData.get('facebookLink')?.value.trim(),
      this.oldAccData.registrationDate,
      this.oldAccData.role,
    )
  }

  getNewName(): string {
    let inputtedName: string = this.newAccData.get('name')?.value;
    return inputtedName == null || inputtedName == '' ? this.newAccData.get('login')?.value : inputtedName;
  }

  getErrorForLogin() {
    const login = this.newAccData.get("login");
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
    const email = this.newAccData.get('email');
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
    const description = this.newAccData.get('description');
    if (description?.hasError('maxlength')) {
      return 'Maximum length for description is ' + this.fieldsSizes.MAX_LENGTH_FOR_DESCRIPTION;
    }

    return '';
  }

  getErrorForHobbies() {
    const hobbies = this.newAccData.get('hobbies');
    if (hobbies?.hasError('maxlength')) {
      return 'Maximum length for hobbies is ' + this.fieldsSizes.MAX_LENGTH_FOR_USERS_HOBBIES;
    }

    return '';
  }

  getErrorForTwitterLink() {
    const twitterLink = this.newAccData.get('twitterLink');
    if (twitterLink?.hasError('maxlength')) {
      return 'Maximum length for Twitter link is ' + this.fieldsSizes.MAX_LENGTH_FOR_LINK;
    }

    return '';
  }

  getErrorForFacebookLink() {
    const facebookLink = this.newAccData.get('facebookLink');
    if (facebookLink?.hasError('maxlength')) {
      return 'Maximum length for Facebook link is ' + this.fieldsSizes.MAX_LENGTH_FOR_LINK;
    }

    return '';
  }

  getErrorForInstagramLink() {
    const instagramLink = this.newAccData.get('instagramLink');
    if (instagramLink?.hasError('maxlength')) {
      return 'Maximum length for Instagram link is ' + this.fieldsSizes.MAX_LENGTH_FOR_LINK;
    }

    return '';
  }

  get login() {
    return this.newAccData.get("login");
  }

  get name() {
    return this.newAccData.get("name");
  }

  get email() {
    return this.newAccData.get("email");
  }

  get description() {
    return this.newAccData.get('description');
  }

  get hobbies() {
    return this.newAccData.get('hobbies');
  }

  get twitterLink() {
    return this.newAccData.get('twitterLink');
  }

  get instagramLink() {
    return this.newAccData.get('instagramLink');
  }

  get facebookLink() {
    return this.newAccData.get('facebookLink');
  }

}
