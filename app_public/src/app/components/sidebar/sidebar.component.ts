import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  private role: string = this.authService.getUserRole()

  public checkSuper(): boolean {
    if (this.role !== 'facilitator') {
      return false
    } else {
      return true
    }
  }

  public checkAdmin(): boolean {
    const roles = ['facilitator', 'admin']
    if (!roles.includes(this.role)) {
      return false
    } else {
      return true
    }
  }

  public checkUser(): boolean {
    const roles = ['facilitator', 'admin']
    if (roles.includes(this.role)) {
      return false
    } else {
      return true
    }
  }

}
