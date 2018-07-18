import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserStoreService } from '../../lib/user-store.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userStoreService: UserStoreService,
    private router: Router,
  ) { }

  canActivate() {
    // console.log('canActivate');
    if (this.userStoreService.isLogged) {
      return true;
    }
    this.router.navigateByUrl('auth/login');
    return false;
  }
}
