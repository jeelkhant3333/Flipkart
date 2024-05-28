import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../state/cart/cart.service';
import { Store } from '@ngrx/store';
import { CartState } from '../../../../state/cart/cart.reducer';
import { getCartRequest } from '../../../../state/cart/cart.action';
import { AppState } from '../../../../models/AppState';
import { getCart } from '../../../../state/cart/cart.selector';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  @Input() cartItem: any;

  constructor(
    private cartService:CartService,
    private store:Store<CartState>
  ){}


  removeCartItem() {
    this.cartService.removeCartItem(this.cartItem.id)
    // console.log("get cart req from store");
    this.store.dispatch(getCartRequest())
  }

  updateCartItem(count : number) {
  console.log("after" , count+this.cartItem.quantity);
  
    this.cartService.updateCartItem({
      cartItemId : this.cartItem.id,
      data : count+this.cartItem.quantity
    })
  }

}
