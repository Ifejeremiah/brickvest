import { Inject, Injectable } from '@angular/core';


import { BROWSER_STORAGE } from '../classes/local-storage';
import { AuthResponse, DataService, LoginData, RegisterData } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private dataService: DataService
  ) { }

  private token: string = 'auth-token';

  public getToken(): string {
    const token = this.storage.getItem(this.token);
    return token !== null ? token : '';
  }

  public saveToken(token: string): void {
    this.storage.setItem(this.token, token);
  }

  public login(data: LoginData): Promise<any> {
    return this.dataService.login(data)
      .then((authResponse: AuthResponse) => this.saveToken(authResponse.data.jwtToken));
  }

  public register(data: RegisterData): Promise<any> {
    return this.dataService.register(data)
      .then(
        (authResponse: AuthResponse) => this.saveToken(authResponse.data.jwtToken)
      );
  }


  public logout(): void {
    this.storage.removeItem(this.token);
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (!token) {
      return false;
    } else {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
  }

  public getCurrentUserId(): string {
    const token: string = this.getToken();
    let result;
    if (token) {
      const { id } = JSON.parse(atob(token.split('.')[1]));
      result = id;
    }
    return result;
  }

  public getUserRole(): string {
    const token: string = this.getToken();
    let result;
    if (token) {
      const { role } = JSON.parse(atob(token.split('.')[1]));
      result = role;
    }
    return result;
  }

  public isFacilitator(): boolean {
    if (this.getUserRole() === 'facilitator') {
      return true
    } else {
      return false
    }
  }

  public isAdmin(): boolean {
    if (this.getUserRole() === 'admin') {
      return true
    } else {
      return false
    }
  }

  public isMobile(width: Number): boolean {
    return window.matchMedia(`(max-width:${width}px)`).matches
  }

}
