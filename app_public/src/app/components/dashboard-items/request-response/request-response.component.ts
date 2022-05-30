import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-response',
  templateUrl: './request-response.component.html',
  styleUrls: ['./request-response.component.css', './request.component.css', './placeholder-anime.css']
})
export class RequestResponseComponent implements OnInit {

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Onebrick - User Requests')
    this.getAll(1, this.totalLimit)
  }

  private totalLimit: number = 10;

  public toggle: boolean = false;

  public view = false

  public animatedBg: boolean = true;

  public requests!: any[]

  public request: any

  public clicked: any;

  public data: any

  public noData = '';

  public body = {
    response: ''
  }

  public currentRequestId: any

  public isMobile(): boolean {
    return this.authService.isMobile(992)
  }

  public doToggle(): void {
    if (this.toggle) this.toggle = false
    else this.toggle = true
  }

  public doShowId(id: string): void {
    this.view = true
    this.currentRequestId = id
    this.requestService.getRequestById(id)
      .then(response => {
        this.request = response.data
        console.log(this.request)
        this.view = false
      });
  }

  private getAll(page: number, limit: number) {
    this.requestService.getAllRequests(page, limit)
      .then(response => {
        this.requests = response.data.results
        response.data['totalLimit'] = this.totalLimit
        this.data = response.data;
        this.animatedBg = false
      }).catch(err => {
        if (err.status === 404) {
          this.noData = 'You have made no requests yet.'
          this.animatedBg = false
        }
      });
  }

  public getParamsFromChild(value: any): void {
    const { page, limit } = value;
    this.getAll(page, limit);
  }

  public sendResponse() {
    const { response } = this.body
    if (!response) {
      return;
    } else {
      this.requestService.makeResponse(this.currentRequestId, response.trim())
        .then(() => this.doShowId(this.currentRequestId))
    }
  }
}
