import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../../service/userService/user.service";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccessForAdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.getRole() != 'ADMIN') {
      this.router.navigateByUrl('/chat');
      return false;
    }
    return true;
  }

}
