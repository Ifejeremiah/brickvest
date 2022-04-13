import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateGuardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private isVerified: boolean = this.authService.getCurrentUser().is_verified

  canActivate(): boolean {
    if (this.isVerified) {
      return true;
    } else {
      this.router.navigateByUrl('/verify-account');
      return false;
    }
  }

}
