import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserById(this.getUserId())
    this.getActions(this.getUserId(), 1, this.totalLimit)
  }

  public toggle: boolean = false;

  public firstBtn = 'active';

  public secondBtn!: string;

  public actions: any;

  public currentUser: any;

  public data: any;

  private totalLimit: number = 10;

  public credentials = { image: '', name: '', email: '' }

  public message: string = '';

  public clearMsg(): void {
    this.message = '';
  }

  public onSubmit() {
    this.updateUser(this.credentials)
      .then(() => {
        this.message = 'Your account is updated successfully'
        setTimeout(() => this.clearMsg(), 4000);
      })
      .catch(err => {
        this.message = err.error.message
        setTimeout(() => this.clearMsg(), 4000)
      })
  }

  private getActions(id: string, page: number, limit: number) {
    this.userService.getUserActions(id, page, limit)
      .then(response => {
        this.actions = response.data.results;
        response.data['totalLimit'] = this.totalLimit
        this.data = response.data;
      })
  }

  private getUserId(): string {
    return this.authService.getCurrentUserId()
  }

  public doShowHistory() {
    this.toggle = false;
    this.firstBtn = 'active';
    this.secondBtn = '';
  }

  public doShowSettings() {
    this.toggle = true
    this.firstBtn = ''
    this.secondBtn = 'active';
  }

  public getParamsFromChild(value: any) {
    const { userId, page, limit } = value;
    this.getActions(userId, page, limit);
  }

  public async getUserById(id: string) {
    const response = await this.userService.getUserById(id)
    const { name, email } = response.data
    this.credentials['name'] = name
    this.credentials['email'] = email
  }

  private async updateUser(formBody: any) {
    await this.userService.updateUserById(this.getUserId(), formBody)
  }
}
