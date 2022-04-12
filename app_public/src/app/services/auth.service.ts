import { Inject, Injectable } from '@angular/core';


import { BROWSER_STORAGE } from '../classes/local-storage';
import { AuthToken, DataService, LoginData, RegisterData } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private dataService: DataService
  ) { }


  public getToken(): string {
    const token = this.storage.getItem('auth-token');
    return token !== null ? token : '';
  }


  public saveToken(token: string): void {
    this.storage.setItem('auth-token', token);
  }


  public login(data: LoginData): Promise<any> {
    return this.dataService.login(data)
      .then(
        (authResponse: AuthToken) => this.saveToken(authResponse.token)
      );
  }


  public register(data: RegisterData): Promise<any> {
    return this.dataService.register(data)
      .then(
        (authResponse: AuthToken) => this.saveToken(authResponse.token)
      );
  }


  public logout(): void {
    this.storage.removeItem('starhub-token');
  }


  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false
    }
  }


  public getCurrentUser(): any {
    const token: string = this.getToken();

    if (token) {
      const { name, email, role, is_active } = JSON.parse(atob(token.split('.')[1]));
      return { name, email, role, is_active };
    }
  }

}
