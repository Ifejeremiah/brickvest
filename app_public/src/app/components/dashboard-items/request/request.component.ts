import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { RequestData, RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css', './placeholder-anime.css']
})
export class RequestComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Onebrick - Requests')
    this.getCurrentUserRequests(1, this.totalLimit);
  }

  public requests: any;

  public view: boolean = false;

  public userRequest: any;

  public data: any;

  public message: string = '';

  public noData: string = ''

  public toggle: boolean = false;

  public animatedBg: boolean = true;

  private totalLimit: number = 10;

  public clicked: any;

  public requestBody = {
    title: '',
    subject: '',
    body: ''
  }

  public doToggle(): void {
    if (this.toggle) this.toggle = false
    else this.toggle = true
  }

  public clearMsg(): void {
    this.message = ''
  }

  private clearForm(): void {
    this.requestBody['title'] = ''
    this.requestBody['subject'] = ''
    this.requestBody['body'] = ''
  }

  public onSubmit(): void {
    let { title, subject, body } = this.requestBody;
    if (!title.trim() || !subject.trim() || !body.trim()) {
      this.message = 'Please fill all fields to make a request';
      setTimeout(() => { this.message = '' }, 4000)
    } else {
      console.log(this.requestBody)
      this.postRequest(this.requestBody);
    }
  }

  public postRequest(data: RequestData): void {
    this.requestService.postRequests(data)
      .then(() => {
        this.clearForm();
        this.noData = ''
        this.message = 'Your request has been taken successfully';
        setTimeout(() => this.clearMsg(), 4000);
        this.getCurrentUserRequests(1, this.totalLimit);
      });
  }

  public getCurrentUserRequests(page: number, limit: number): void {
    this.requestService.getUserRequestById(page, limit)
      .then(response => {
        this.requests = response.data.results;
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

  public isMobile(): boolean {
    return this.authService.isMobile(992)
  }

  public getParamsFromChild(value: any): void {
    const { page, limit } = value;
    this.getCurrentUserRequests(page, limit);
  }

  public getUserId(): string {
    return this.authService.getCurrentUserId()
  }

  public doShowId(id: string): void {
    this.view = true
    this.requestService.getRequestById(id)
      .then(response => {
        this.userRequest = response.data
        this.view = false
      });
  }
}
