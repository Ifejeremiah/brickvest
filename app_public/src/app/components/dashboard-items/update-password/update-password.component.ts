import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public notVerified: boolean = true;

  public message: string = '';

  public clearMsg(): void {
    this.message = '';
  }

  public displayChild(value: string): void {
    if (value === '12345678'){
      this.notVerified = false;
    }
  }


  public credentials = {
    password: '',
    password2: ''
  }

  public return(): void {
    this.router.navigate(['', 'overview']);
  }

  public onSubmit(): void {
    const { password, password2 } = this.credentials;
    if (!password || !password2) {
      this.message = 'Please enter password to update';
    } else if (password !== password2) {
      this.message = 'Passwords do not match';
    } else {
      this.message = 'Passwords updated successfully';
      setTimeout(() => {
        this.router.navigate(['', 'overview']);
      }, 4000);
    }
  }

}
