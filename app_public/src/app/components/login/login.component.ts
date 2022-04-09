import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public credentials = {
    email: '',
    password: ''
  }

  public message: string = '';

  public removeMsg(): void {
    this.message = '';
  }

  public onLoginSubmit(): void {
    this.message = '';
    let { email, password } = this.credentials;

    if (!email || !password) {
      this.message = 'Please fill in all fields';
    } else if (email != '0001@gmail.com' || password != '12345678') {
      this.message = 'Incorrect email or password';
    } else {
      this.message = 'Logged In';
      false;
    }
  }

}
