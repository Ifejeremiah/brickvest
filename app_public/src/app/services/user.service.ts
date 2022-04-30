import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
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

  private setParams(page: number, limit: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    return params;
  }

  public getUserActions(id: string, page: number, limit: number) {
    const url: string = `${this.apiBase}/users/actions/${id}`;
    return this.http
      .get(url, { headers: this.sendTokenHeader(), params: this.setParams(page, limit) })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getUserById(id: string) {
    return this.makeRequest(id, 'get');
  }

  public async updateUserById(id: string, formBody: any) {
    return this.makeRequest(id, 'patch', formBody);
  }

  public async deleteUserById(id: string) {
    return this.makeRequest(id, 'delete');
  }

  private async makeRequest(id: string, method: any, formBody = {}): Promise<any> {
    const url: string = `${this.apiBase}/users/${id}`;
    const options = { headers: this.sendTokenHeader() }

    switch (method) {
      case 'get':
        return this.http
          .get(url, options)
          .toPromise()
          .then(response => response)
          .catch(this.handleError);

      case 'patch':
        return this.http
          .patch(url, formBody, options)
          .toPromise()
          .then(response => response)
          .catch(this.handleError);

      case 'delete':
        return this.http
          .delete(url, options)
          .toPromise()
          .then(response => response)
          .catch(this.handleError);
    }
  }


}
