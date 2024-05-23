import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../state/cart/cart.service';

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
  ){}
  
  removeCartItem() {
    throw new
      Error('Method not implemented.');
  }

  updateCartItem(count : number) {
  console.log("count" , count);
  console.log("after" , count+this.cartItem.quantity);
  
    this.cartService.updateCartItem({
      cartItemId : this.cartItem.id,
      data : {quantity : count+this.cartItem.quantity} 
    }).subscribe((data)=>{
      console.log("data",data);
      
      this.cartItem = data
    })
  }

}
