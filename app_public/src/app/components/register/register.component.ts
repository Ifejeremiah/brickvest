import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public credentials = {
    name: '',
    email: '',
    password: '',
    password2: ''
  }

  public message: string = '';

  public clearMsg(): void {
    this.message = '';
  }

  public googleAuth(): void {
    this.message = 'Feature not available for now';
  }

  public onSubmit(): void {
    let { name, email, password, password2 } = this.credentials;

    if (!name || !email || !password || !password2) {
      this.message = 'Please fill in all fields';
    } else if (password.length < 6) {
      this.message = 'Passwords should be at least 6 characters';
    } else if (password !== password2) {
      this.message = 'Passwords do not match';
    } else {
      this.doRegister();
    }
  }

  
  private doRegister(): void {
    this.authService.register(this.credentials)
      .then(() => {
        this.router.navigateByUrl('/verify-account');
      })
      .catch(err => { this.message = err.error.error });
  }

}
