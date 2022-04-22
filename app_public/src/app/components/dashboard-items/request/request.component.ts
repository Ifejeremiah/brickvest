import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public message: string = '';

  public requestBody = {
    title: '',
    subject: '',
    description: ''
  }

  public clearMsg(): void {
    this.message = ''
  }

  public doDiscard(): void {
    this.requestBody.title = '';
    this.requestBody.subject = '';
    this.requestBody.description = '';
  }

  public onSubmit(): void {
    let { title, subject, description } = this.requestBody;

    if (!title || !subject || !description) {
      false;
    } else {
      this.message = 'Your request has been taken successfully';
      this.doDiscard();

      setTimeout(() => this.clearMsg(), 4000)
    }
  }

}
