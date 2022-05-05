import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public doLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  public notify: boolean = true;

  public body = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  public message = '';

  private clearMsg(): void {
    this.message = ''
  }

  private clearForm(): void {
    this.body['currentPassword'] = ''
    this.body['newPassword'] = ''
    this.body['confirmPassword'] = ''
  }

  private sendMessage(msg: string): void {
    this.message = msg
    setTimeout(() => this.clearMsg(), 4000)
  }

  public onSubmit() {
    const { currentPassword, newPassword, confirmPassword } = this.body
    if (!currentPassword || !newPassword || !confirmPassword) {
      this.sendMessage('Please fill all fields')
    } else if (newPassword !== confirmPassword) {
      this.sendMessage('Passwords do not match')
    } else {
      const id = this.authService.getCurrentUserId()
      this.userService.updatePassword(id, this.body)
        .then((response) => {
          this.sendMessage('Passwords updated successfully')
          this.clearForm()
          console.log(response)
        }).catch(err => {
          this.sendMessage(err.error.message)
        })
    }
  }

  public checkOut() {
    this.notify = false;
  }

}
