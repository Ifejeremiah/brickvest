import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', './placeholder-anime.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private titleService: Title,
  ) { }


  ngOnInit(): void {
    this.titleService.setTitle('Onebrick - User Management')
    this.getUsers(1, this.totalLimit)
  }

  private totalLimit: number = 10;

  public roles = {
    all: '',
    admin: 'admin',
    user: 'user',
    facilitator: 'facilitator',
  }

  public roleSet = {
    admin: 'admin',
    user: 'user',
  }

  public selectedRole: string = this.roles.all

  public defaultRole: string = this.roleSet.user

  public users!: any[];

  public user: any;

  public message: string = '';

  public data: any;

  public noDataInfo = 'No data'

  private getUsers(page: number, limit: number, role: string = '') {
    this.userService.getUsers(page, limit, role)
      .then(response => {
        this.users = response.data.results
        response.data['totalLimit'] = this.totalLimit
        this.data = response.data;
      })
  }

  public getParamsFromChild(value: any): void {
    const { page, limit } = value;
    this.getUsers(page, limit, this.selectedRole);
  }

  public doSort() {
    this.getUsers(1, this.totalLimit, this.selectedRole)
  }

  public submit(id: string) {
    this.showMsg('Role updated')
    this.userService.updateRoleById(id, { role: this.defaultRole })
      .then(() => {
        this.showMsg('Role updated')
        this.getUserId(id)
        this.doSort()
      })
  }

  public showMsg(msg: string) {
    this.message = msg
    setTimeout(() => { this.message = '' }, 4000)
  }

  public getUserId(id: string) {
    this.userService.getUserById(id)
      .then(response => {
        this.user = response.data
      })
  }

  public deleteUser(id: string) {
    this.userService.deleteUserById(id)
      .then(() => {
        this.doSort()
        this.getUserId(id)
      })
  }

}
