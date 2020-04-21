import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      amount: new FormControl(this.quantity)
    });
  }

  get amount() {return this.cardForm.get('amount');}

  increaseAmount() {
    this.quantity += 1;
    this.amount.setValue(this.quantity);
  }

  decreaseAmount() {
    this.quantity -= 1;
    this.amount.setValue(this.quantity);
  }

}
