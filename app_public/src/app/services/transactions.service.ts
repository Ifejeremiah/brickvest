import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private sendTokenHeader(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` })
  }

  private getCurrentUser() {
    return this.authService.getCurrentUserId()
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
