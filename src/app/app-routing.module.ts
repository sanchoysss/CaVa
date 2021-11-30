import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewUserComponent} from './components/new-user/new-user.component';
import {UsersComponent} from './components/users/users.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {ErrorComponent} from "./components/error/error.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {AccessGuard} from "./guards/accessGuard/access.guard";
import {TestChatComponent} from "./components/test-chat/test-chat.component";
import {ChatComponent} from "./components/chat/chat.component";
import {AccountInfoComponent} from "./components/account-info/account-info.component";
import {AccountEditComponent} from "./components/account-edit/account-edit.component";
import {DocumentationComponent} from "./components/documentation/documentation.component";
import {AuthGuard} from "./guards/authGuard/auth.guard";
import {AccessForAdminGuard} from "./guards/accessForAdminGuard/access-for-admin.guard";
const routes: Routes = [
  {path: '', redirectTo: 'chat', pathMatch: 'full'},
  {path: 'admin/user', component: UsersComponent, canActivate: [AccessGuard, AccessForAdminGuard]},
  {path: 'admin/user/new', component: NewUserComponent, canActivate: [AccessGuard, AccessForAdminGuard]},
  {path: 'admin/user/:id', component: EditUserComponent, canActivate: [AccessGuard, AccessForAdminGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard]},
  {path: 'test-chat', component: TestChatComponent, canActivate: [AccessGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [AccessGuard]},
  {path: 'account/edit', component: AccountEditComponent, canActivate: [AccessGuard]},
  {path: 'account/:login', component: AccountInfoComponent, canActivate: [AccessGuard]},
  {path: 'about', component: DocumentationComponent},
  {path: '**', component: ErrorComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
