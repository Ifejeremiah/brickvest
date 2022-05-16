import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css', './placeholder-anime.css']
})
export class OverviewComponent implements OnInit {

  constructor(
    private propertyService: PropertyService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Onebrick - Overview')
    this.removeAnime()
    this.getAllProperties(1, 10)
  }

  public animatedBg: boolean = true;

  public toggle: boolean = false;

  public firstBtn = 'active';

  public secondBtn!: string;

  public properties: any;

  public data: any;

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

  private async getAllProperties(page: number, limit: number) {
    const { data } = await this.propertyService.getAllProperties(page, limit)
    this.properties = data.results
  }

  public async getPropertyId(id: string) {
    const { data } = await this.propertyService.getPropertiesById(id)
    this.data = data
  }
}
