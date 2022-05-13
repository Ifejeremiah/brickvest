import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  private apiBase: string = environment.apiBaseUri;

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error);
  }

  private sendTokenHeader(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` })
  }

  private setParams(page: number, limit: number): HttpParams {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    return params;
  }

  public getAllProperties(page: number, limit: number) {
    const url = `${this.apiBase}/properties`;
    return this.http
      .get(url, { headers: this.sendTokenHeader(), params: this.setParams(page, limit) })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getPropertiesById(id: string) {
    const url = `${this.apiBase}/properties/${id}`;
    return this.http
      .get(url, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

}
