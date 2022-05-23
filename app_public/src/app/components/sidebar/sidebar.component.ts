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
    this.checkRoles()
  }

  public isFacilitator: boolean = false;

  public isAdmin: boolean = false;

  private checkRoles(): void {
    if (this.authService.isFacilitator()) {
      this.isFacilitator = true
    } else if (this.authService.isAdmin()) {
      this.isAdmin = true
    }
  }


}
