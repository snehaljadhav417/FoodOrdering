import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CartService} from '../services/cart/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _dish: any;
  @Input()
  set dish(data: any) {
    this._dish = data;
  }

  get dish() {
    return this._dish;
  }

  cardForm: FormGroup;

  quantity = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.quantity = this.cartService.getQuantity(this.dish._id);
    this.cardForm = new FormGroup({
      amount: new FormControl(this.quantity)
    });
  }

  get amount() {return this.cardForm.get('amount'); }

  increaseAmount() {
    this.quantity += 1;
    this.amount.setValue(this.quantity);
    this.cartService.add(this.dish);
  }

  decreaseAmount() {
    this.quantity -= 1;
    this.amount.setValue(this.quantity);
    this.cartService.remove(this.dish.id);
  }

}
