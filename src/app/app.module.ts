import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UsersComponent} from './components/users/users.component';
import {NewUserComponent} from './components/new-user/new-user.component';

import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import {EditUserComponent} from './components/edit-user/edit-user.component'
import {UserService} from './service/userService/user.service';
import {UserDeleteConfirmingComponent} from './components/user-delete-confirming/user-delete-confirming.component';

import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog'
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ErrorComponent} from './components/error/error.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoginComponent} from './components/login/login.component';
import {TestChatComponent} from './components/test-chat/test-chat.component';
import {ChatComponent} from './components/chat/chat.component';
import {AccountInfoComponent} from './components/account-info/account-info.component';

import {ClipboardModule} from '@angular/cdk/clipboard';
import {AccountEditComponent} from './components/account-edit/account-edit.component';
import {DocumentationComponent} from './components/documentation/documentation.component';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NewUserComponent,
    EditUserComponent,
    UserDeleteConfirmingComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    SignUpComponent,
    LoginComponent,
    TestChatComponent,
    ChatComponent,
    AccountInfoComponent,
    AccountEditComponent,
    DocumentationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatMenuModule,
    ClipboardModule,
    CommonModule,
    MatAutocompleteModule
  ],
  providers: [
    UserService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserDeleteConfirmingComponent
  ],
  exports: [
    MatProgressBarModule
  ]
})
export class AppModule {
}
