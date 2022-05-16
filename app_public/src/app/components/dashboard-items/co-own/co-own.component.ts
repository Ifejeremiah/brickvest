import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-co-own',
  templateUrl: './co-own.component.html',
  styleUrls: ['./co-own.component.css', './placeholder-anime.css']
})
export class CoOwnComponent implements OnInit {

  constructor(
    private propertyService: PropertyService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Onebrick - Co own')
    this.removeAnime()
    this.getAllProperties(1, 10)
  }

  public properties: any;

  public animatedBg: boolean = true;

  public data: any;

  private removeAnime() {
    setTimeout(() => { this.animatedBg = false }, 2000)
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
