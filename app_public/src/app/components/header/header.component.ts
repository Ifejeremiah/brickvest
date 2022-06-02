import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
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
    private userService: UserService,
    private notifyService: NotifyService,
  ) { }

  ngOnInit(): void {
    this.checkRole()
    this.getAllNotifications()
    this.getNotificationsById()
  }

  public doLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  public isFacilitator: boolean = false;

  public notifications: any

  public notification: any

  private role = this.authService.getUserRole()

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

  public adminView() {
    setTimeout(() => {
      this.notifications = true
    }, 4000)
  }

  public userView() {
    setTimeout(() => {
      this.notification.userViewed = true
    }, 4000)
  }

  private checkRole() {
    this.isFacilitator = this.authService.isFacilitator()
  }

  public checkForAdmin(): boolean {
    const roles = ['facilitator', 'admin']
    if (!roles.includes(this.role)) {
      return false
    } else {
      return true
    }
  }

  private getAllNotifications() {
    if (this.checkForAdmin()) {
      this.notifyService.getAllNotification()
        .then(response => {
          const x = response.data
          const y = x.find((a: any) => a.adminViewed === false)
          this.notifications = y ? false : true

        })
    }
  }

  private getNotificationsById() {
    if (!this.checkForAdmin()) {
      this.notifyService.getNotificationByUserId()
        .then(response => {
          this.notification = response.data
        })
    }
  }

}
