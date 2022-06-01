import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Onebrick - Overview')
    this.removeAnime()
    this.getAllProperties(1, 10)
    this.checkUser()
  }

  private role: string = this.authService.getUserRole()

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
      this.router.navigate(['dashboard', 'properties'])
      return false
    } else {
      return true
    }
  }
}
