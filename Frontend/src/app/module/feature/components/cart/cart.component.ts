import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from "../../../share/components/cart-item/cart-item.component";
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { CartService } from '../../../../state/cart/cart.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';
import { log } from 'console';
import { CartState } from '../../../../state/cart/cart.reducer';
import { getCartRequest } from '../../../../state/cart/cart.action';
import { getCart, getCartItems } from '../../../../state/cart/cart.selector';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [CommonModule, CartItemComponent, MatDividerModule]
})
export class CartComponent {

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<CartState>
  ) {


  }

  cartItems!: any[]
  cart!:any[]
  totalPrice = 0
  totalDiscountedPrice = 0
  discount = 0

  ngOnInit() {
    this.store.dispatch(getCartRequest())
    this.store.select(getCart).subscribe((cart) => {
      // this.cart = cart
      console.log("updated cart")
      this.totalPrice = cart.totalPrice
      this.totalDiscountedPrice = cart.totalDiscountedPrice
      this.discount = cart.discount
      this.cartItems = cart.cartItems
      // console.log("itemsss" , this.cartItems)
      // console.log("total price" , this.totalPrice);
      
    })

    

  }

  navigateToChechout() {
    this.cartService.getCart()
    this.router.navigate(["checkout"]);
  }

}
