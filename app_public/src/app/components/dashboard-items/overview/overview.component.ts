import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css', './placeholder-anime.css']
})
export class OverviewComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    this.removeAnime()
  }

  public animatedBg: boolean = true;

  public toggle: boolean = false;

  public firstBtn = 'active';

  public secondBtn!: string;

  private initialCount = 989;

  public data = {
    propertyCost: this.initialCount,
    estimate: this.initialCount
  }

  private removeAnime() {
    setTimeout(() => {
      this.animatedBg = false
    }, 2000)
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
}
