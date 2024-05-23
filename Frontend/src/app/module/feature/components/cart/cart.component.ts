import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from "../../../share/components/cart-item/cart-item.component";
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';
import { CartService } from '../../../../state/cart/cart.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    imports: [CommonModule, CartItemComponent,MatDividerModule]
})
export class CartComponent {

  constructor(
    private router: Router,
    private cartService:CartService,
    private store : Store<AppState>
    ){

  }

// cart = [1,1,1,1,1,1]
cartItems:any

ngOnInit(){

  this.cartService.getCart().subscribe(
    (cart)=>{
      // console.log("cart data",cart.cartItems)
      this.cartItems = cart.cartItems
    })


}

navigateToChechout() {
  this.cartService.getCart().subscribe()
  this.router.navigate(["checkout"]); 
  }

}
