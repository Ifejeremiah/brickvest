import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { environment } from 'src/environments/environment';



// Classes
export class LoginData {
  email !: string;
  password !: string;
}

export class RegisterData {
  name !: string;
  email!: string;
  password!: string;
  password2!: string;
}

export class AuthResponse {
  status!: string;
  message!: string;
  data!: {
    id: string,
    name: string,
    email: string,
    role: string,
    jwtToken: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
  ) { }


  private apiBase: string = environment.apiBaseUri;


  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error);
  }


  public login(userData: LoginData): Promise<AuthResponse> {
    return this.makeAuthApiCall('auth/login', userData);
  }

  public register(userData: RegisterData): Promise<AuthResponse> {
    return this.makeAuthApiCall('auth/register', userData);
  }

  private makeAuthApiCall(path: string, data: LoginData): Promise<AuthResponse> {
    const url: string = `${this.apiBase}/${path}`;

    return this.http
      .post(url, data)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  public verifyAccountByEmail(email: string): Promise<any> {
    const url: string = `${this.apiBase}/verify/${email}`;

    return this.http
      .post(url, email)
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  public verifyAccountByToken(email: string, token: string): Promise<AuthResponse> {
    const url: string = `${this.apiBase}/verify/${email}/${token}`;

    return this.http
      .post(url, null)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

}
