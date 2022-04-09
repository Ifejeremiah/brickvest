import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public credentials = {
    name: '',
    email: '',
    password: '',
    password2: ''
  }

  public message: string = '';

  public removeMsg(): void {
    this.message = '';
  }

  public googleAuth(): void {
    this.message = 'Logged In through Google';
  }

  public onLoginSubmit(): void {
    this.message = '';
    let { name, email, password, password2 } = this.credentials;

    if (!name || !email || !password || !password2) {
      this.message = 'Please fill in all fields';
    } else if (email != '0001@gmail.com' || password != '12345678') {
      this.message = 'Incorrect email or password';
    } else {
      this.message = 'Logged In';
      false;
    }
  }

}
