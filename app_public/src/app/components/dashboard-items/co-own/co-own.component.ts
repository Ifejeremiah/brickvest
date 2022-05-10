import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-co-own',
  templateUrl: './co-own.component.html',
  styleUrls: ['./co-own.component.css', './placeholder-anime.css']
})
export class CoOwnComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    this.removeAnime()
  }

  public animatedBg: boolean = true;

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
}
