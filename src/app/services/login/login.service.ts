import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body) {
    const url = environment.loginUrl;
    return this.http.post(url, body);
  }

  signUp(body) {
    const url = environment.signUpUrl;
    return this.http.post(url, body);
  }
}
