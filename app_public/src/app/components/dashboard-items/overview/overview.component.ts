import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public animatedBg: boolean = false;

  public toggle: boolean = false;

  
  public firstBtn = 'active';

  
  
  public secondBtn!: string;

  public doShowFirstRow() {
    this.toggle = false;
    this.firstBtn = 'active';
    this.secondBtn = '';
  }

  public doShowSecondRow() {
    this.toggle = true;
    this.firstBtn = ''
    this.secondBtn = 'active';
  }
}
