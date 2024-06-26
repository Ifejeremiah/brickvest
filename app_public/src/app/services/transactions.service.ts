import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export class TransactionDetails {
  amount!: number;
  propertyid!: string;
}

class TransactionVerify {
  transReference!: string;
  flwTransId!: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  private apiBase: string = environment.apiBaseUri;

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error);
  }

  private setParams(page: number, limit: number, status: string = '') {
    let params = new HttpParams();
    params = params.append('page', page)
    params = params.append('limit', limit)
    params = params.append('status', status)
    return params
  }

  private sendTokenHeader(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` })
  }

  private getCurrentUser() {
    return this.authService.getCurrentUserId()
  }

  public getAllTransactions(page: number, limit: number, status: string) {
    const url = `${this.apiBase}/transactions`;
    const options = {
      headers: this.sendTokenHeader(),
      params: this.setParams(page, limit, status)
    }

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getTransactionsById(id: string) {
    const url = `${this.apiBase}/transactions/${id}`;
    return this.http
      .get(url, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getTransactionsByUserID() {
    const url = `${this.apiBase}/transactions/users/${this.getCurrentUser()}`;
    return this.http
      .get(url, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public makeTransaction(body: TransactionDetails) {
    const url = `${this.apiBase}/transactions`;
    return this.http
      .post(url, body, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public verifyTransaction(body: TransactionVerify) {
    const url = `${this.apiBase}/transactions/verify`;
    return this.http
      .post(url, body, { headers: this.sendTokenHeader() })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
