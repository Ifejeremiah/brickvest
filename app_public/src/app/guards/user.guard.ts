import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private role = this.authService.getUserRole()

  canActivate(): boolean {
    const roles = ['facilitator', 'admin']
    if (roles.includes(this.role)) {
      this.router.navigate(['dashboard', 'overview'])
      return false
    } else {
      return true
    }
  }
}
