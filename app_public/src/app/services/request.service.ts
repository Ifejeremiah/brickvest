import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export class RequestData {
  title!: string;
  subject!: string;
  body!: string;
}


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private apiBase: string = environment.apiBaseUri;

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error);
  }

  private setParams(page: number, limit: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    return params;
  }

  private sendTokenHeader() {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` })
  }

  public postRequests(formData: RequestData) {
    const url = `${this.apiBase}/requests`;
    return this.http
      .post(url, formData, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response as RequestData)
      .catch(this.handleError);
  }

  public getUserRequestById(page: number, limit: number) {
    const userid = this.authService.getCurrentUserId()
    const url = `${this.apiBase}/requests/users/${userid}`;
    return this.http
      .get(url, { headers: this.sendTokenHeader(), params: this.setParams(page, limit) })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getRequestById(id: string) {
    const url = `${this.apiBase}/requests/${id}`;
    return this.http
      .get(url, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getAllRequests(page: number, limit: number) {
    const url = `${this.apiBase}/requests`;
    return this.http
      .get(url, { headers: this.sendTokenHeader(), params: this.setParams(page, limit) })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public makeResponse(id: string, body: string) {
    const url = `${this.apiBase}/requests/${id}`;
    return this.http
      .patch(url, { response: body }, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
