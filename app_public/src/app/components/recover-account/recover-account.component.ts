import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})
export class RecoverAccountComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public message: string = '';

  public isValidEmail: boolean = false;

  public credentials = {
    email: '',
    token: ''
  }

  public clearMsg(): void {
    this.message = ''
  }

  public onSubmitEmail() {
    const { email } = this.credentials;

    if (!email) {
      this.message = 'Please enter email address'
    } else {
      this.dataService.recoverAccountByEmail(email)
        .then(() => {
          this.isValidEmail = true;
        }).catch(err => {
          if (err.status === 404) {
            this.message = 'Could not find email';
          }
        });
    }
  }


  public onSubmitToken() {
    const { email, token } = this.credentials;
    if (!token) {
      this.message = 'Please enter your recovery code';
    } else {
      this.dataService.recoverAccountByToken(email, token)
        .then((response) => {
          this.authService.saveToken(response.token);
          this.accessAcount();
        })
        .catch(err => {
          if (err.status === 400) {
            this.message = 'Invalid recovery code, please check your email';
          }
        });

    }
  }
  

  public accessAcount() {
    this.router.navigateByUrl('/dashboard');
  }

}
