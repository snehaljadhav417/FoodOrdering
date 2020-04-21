import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isCartEmpty = true;
  cart = [];
  total = 0;

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
