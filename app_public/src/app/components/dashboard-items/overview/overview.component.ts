import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css', './modals.css']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public animatedBg: boolean = false;

  public toggle: boolean = false;

  public message = '';

  public firstBtn = 'active';

  public secondBtn!: string;

  public propertyCost = 987

  public estimate = this.propertyCost

  public details = {
    unitNumber: 1
  }

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

  public calculate() {
    const { unitNumber } = this.details
    this.estimate = (unitNumber === null || unitNumber === 0) ? this.propertyCost : unitNumber * this.propertyCost
  }


}
