import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    this.reloadAllScripts()
  }

  private reloadAllScripts(): void {
    if (!localStorage.getItem('abc')) {
      localStorage.setItem('abc', 'def');
      location.reload();
    } else {
      localStorage.removeItem('abc');
    }
  }
}
