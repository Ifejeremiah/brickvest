import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private role = this.authService.getUserRole()

  canActivate(): boolean {
    const superAdmin = 'facilitator'
    if (this.role !== superAdmin) {
      this.router.navigate(['dashboard', 'overview'])
      return false
    } else {
      return true
    }
  }
}
