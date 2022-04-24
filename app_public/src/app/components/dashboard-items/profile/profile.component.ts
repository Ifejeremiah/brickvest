import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public credentials = {
    image: '',
    name: 'John',
    email: 'johndoe@gmail.com'
  }

  public message: string = '';

  public clearMsg(): void {
    this.message = '';
  }

  public onSubmit(): void {
    const { name, email } = this.credentials;

    if (!name || !email) {
      this.message = 'Your name and emails can not be empty';
    } else {
      this.message = 'Your account is updated successfully';
      setTimeout(() => this.clearMsg(), 4000);
    }
  }


}
