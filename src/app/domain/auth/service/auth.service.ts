import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginRequest} from "../model/login-request";
import {JwtResponse} from "../model/jwt-response";
import {config} from "../../../app.config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: LoginRequest): Observable<HttpResponse<JwtResponse>> {
    return this.http.post<JwtResponse>(`${config.url.auth}`, {
        username: credentials.username,
        password: credentials.password
      },
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  }
}
