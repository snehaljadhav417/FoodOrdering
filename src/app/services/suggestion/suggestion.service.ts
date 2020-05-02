import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient) { }

  getSuggestions() {
    const url = environment.suggestion;
    const options = {
      params: new HttpParams().set('cust_id', localStorage.getItem('cust_id'))
    };
    return this.http.get(url, options);
  }
}
