import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCurrentUserEmail();
    this.sendTokenEmail();
  }


  public message: string = '';

  public credentials = {
    token: ''
  }

  public clearMsg(): void {
    this.message = ''
  }

  private getCurrentUserEmail(): string {
    const user = this.authService.getCurrentUser()
    return user.email;
  }

  private sendTokenEmail(): void {
    this.dataService.verifyAccountByEmail(this.getCurrentUserEmail())
  }

  public onSubmit(): void {
    const { token } = this.credentials;

    if (!token) {
      this.message = 'Please enter your verification code';
    } else {

      this.dataService.verifyAccountByToken(this.getCurrentUserEmail(), token)
        .then((response) => {

          this.authService.saveToken(response.data.token);
          this.accessAcount();
        })
        .catch(err => {
          if (err.status === 400) {
            this.message = 'Incorrect code, please check your email';
          } else if (err.status === 404) {
            this.message = 'We could not find you';
          }
        });
    }
  }

  public accessAcount() {
    this.router.navigateByUrl('/dashboard');
  }

}
