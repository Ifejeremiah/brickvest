import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private apiBase: string = environment.apiBaseUri;

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error);
  }

  private sendTokenHeader() {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` })
  }

  public getAllNotification() {
    const url = `${this.apiBase}/notifications`;
    return this.http
      .get(url, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getNotificationByUserId() {
    const url = `${this.apiBase}/notifications/users`;
    return this.http
      .get(url, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
