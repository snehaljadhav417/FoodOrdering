import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CheckoutService} from '../services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isCartEmpty = true;
  cart = [];
  totalPrice = 0;
  totalItems = 0;
  order: any;

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

  constructor(private cartService: CartService,
              private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    const loadCartValue = this.cartService.loadCart();
    if (loadCartValue.items.length > 0) {
      this.cart = loadCartValue.items;
      this.totalPrice = loadCartValue.totalPrice;
      this.totalItems = loadCartValue.totalItems;
      this.isCartEmpty = false;
      const simplifiedCart = [];
      for (const item of this.cart) {
        simplifiedCart.push({
          productId: item.product.id,
          quantity: item.quantity
        });
      }
      this.order = {
        cart: simplifiedCart,
        totalPrice: this.totalPrice
      };
    }
  }

  placeOrder() {
    const checkoutData = {
      ...this.checkoutForm.value,
      ...this.order,
    };

    this.checkoutService.postOrder(checkoutData)
      .subscribe(data => {
        console.log(data);
        localStorage.removeItem('cart');
        this.isCartEmpty = true;
      }, err => {
        console.log(err);
        localStorage.removeItem('cart');
        this.isCartEmpty = true;
      });
  }
}
