import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from "../service/token-storage.service";

@Injectable({providedIn: 'root'})
export class AuthGuardLoginService implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenStorageService.getUsername();
    if (!currentUser) {
      return true;
    }
    this.router.navigate(['/inicio'], {replaceUrl: true});
    return false;
  }
}
