import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RequestData, RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getRequests(this.getUserId(), 1, this.totalLimit);
  }

  public requests: any;

  public userRequest: any;

  public data: any;

  public message: string = '';

  public toggle: boolean = false;

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
        this.message = 'Your request has been taken successfully';
        setTimeout(() => this.clearMsg(), 4000);
        this.getRequests(this.getUserId(), 1, this.totalLimit);
      });
  }

  public getRequests(id: string, page: number, limit: number): void {
    this.requestService.getRequests(id, page, limit)
      .then(response => {
        this.requests = response.data.results;
        response.data['totalLimit'] = this.totalLimit
        this.data = response.data;
        console.log(this.data)
      });
  }

  public isMobile(): boolean {
    return this.authService.isMobile(768)
  }

  public getParamsFromChild(value: any): void {
    const { userId, page, limit } = value;
    this.getRequests(userId, page, limit);
  }

  public getUserId(): string {
    return this.authService.getCurrentUserId()
  }

  public doShowId(id: string): void {
    this.requestService.getRequestById(id)
      .then(response => { this.userRequest = response.data });
  }
}
