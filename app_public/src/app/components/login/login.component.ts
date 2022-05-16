import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Onebrick - Login')
  }

  public credentials = {
    email: '',
    password: ''
  }

  public animate: boolean = false;

  public message!: string;

  public clearMsg(): void {
    this.message = '';
  }

  public googleAuth(): void {
    this.message = 'Feature not available for now';
  }

  public onSubmit(): void {
    let { email, password } = this.credentials;

    if (!email || !password) {
      this.message = 'Please fill in all fields';
    } else {
      this.animate = true
      this.doLogin();
    }
  }

  private doLogin(): void {
    this.authService.login(this.credentials)
      .then(() => {
        this.router.navigateByUrl('/dashboard/overview');
      })
      .catch(err => {
        this.message = err.error.message
        this.animate = false
      });
  }

}
