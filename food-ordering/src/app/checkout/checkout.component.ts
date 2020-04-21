import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isCartEmpty = true;
  cart = [];
  total = 0;

  checkoutForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    }),
    card: new FormGroup({
      cardName: new FormControl(''),
      cardNumber: new FormControl(''),
      expMonth: new FormControl(''),
      expYear: new FormControl(''),
      cvv: new FormControl('')
    })
  });

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    const loadCartValue = this.cartService.loadCart();
    if (loadCartValue.items.length > 0) {
      this.cart = loadCartValue.items;
      this.total = loadCartValue.total;
      this.isCartEmpty = false;
    }
  }
}
