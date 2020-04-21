import {Injectable} from '@angular/core';
import {Item} from '../../models/item';
import {Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
  }

  add(product: Product) {
    const item: Item = {
      product,
      quantity: 1
    };
    if (localStorage.getItem('cart') == null) {
      const cart: any = [];
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      const cart: any = JSON.parse(localStorage.getItem('cart'));
      let index = -1;
      for (let i = 0; i < cart.length; i++) {
        const localItem: Item = JSON.parse(cart[i]);
        if (localItem.product.id === product.id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        const localItem: Item = JSON.parse(cart[index]);
        localItem.quantity += 1;
        cart[index] = JSON.stringify(localItem);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }

  remove(id: string) {
    const cart: any = JSON.parse(localStorage.getItem('cart'));
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
      const item: Item = JSON.parse(cart[i]);
      if (item.product.id === id) {
        index = i;
        break;
      }
    }
    const localItem: Item = JSON.parse(cart[index]);
    localItem.quantity -= 1;
    if (localItem.quantity === 0) {
      cart.splice(index, 1);
    } else {
      cart[index] = JSON.stringify(localItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getQuantity(id: string) {
    const cart: any = JSON.parse(localStorage.getItem('cart'));
    if (cart === null) {
      return 0;
    }
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
      const localItem: Item = JSON.parse(cart[i]);
      if (localItem.product.id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return 0;
    } else {
      const localItem: Item = JSON.parse(cart[index]);
      return localItem.quantity;
    }
  }

  loadCart() {
    let total = 0;
    const items = [];
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart === null) {
      return {
        items,
        total
      };
    }
    for (const i of cart) {
      const item = JSON.parse(i);
      items.push({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price * item.quantity
      });
      total += item.product.price * item.quantity;
    }
    return {
      items,
      total
    };
  }
}
