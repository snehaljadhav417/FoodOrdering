import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) {}

  postOrder(body) {
    const url = environment.order;
    // @ts-ignore
    body.cust_id = Number(localStorage.getItem('cust_id'));
    return this.http.post(url, body);
  }
}
