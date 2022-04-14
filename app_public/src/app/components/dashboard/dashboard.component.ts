import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.reloadAllScripts();
    this.loadOverviewPage();
  }

  private reloadAllScripts(): void {
    if (!localStorage.getItem('abc')) {
      localStorage.setItem('abc', 'def');
      location.reload();
    } else {
      localStorage.removeItem('abc');
    }
  }

  private loadOverviewPage(): void {
    this.router.navigate(['', 'overview']);
  }


}
