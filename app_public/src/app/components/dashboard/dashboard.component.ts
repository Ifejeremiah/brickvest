import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private authSevice: AuthService
  ) { }

  ngOnInit(): void {
  }

  public doLogout(): void {
    this.authSevice.logout();
    this.router.navigateByUrl('/login');
  }
}
