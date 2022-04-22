import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css']
})
export class VerifyPasswordComponent implements OnInit {
  @Output() private data = new EventEmitter<string>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public message!: string;

  public credentials = {
    password: ''
  }

  public clearMsg(): void {
    this.message = '';
  }

  public return(): void {
    this.router.navigate(['', 'overview'])
  }

  public onSubmit(): void {
    const { password } = this.credentials;
    if (!password) {
      this.message = 'Please enter your password';
    } else if (password !== '12345678') {
      this.message = 'Password is not correct';
    } else {
      this.data.emit(password)
    }
  }
}
