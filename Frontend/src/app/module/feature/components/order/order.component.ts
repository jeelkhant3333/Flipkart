import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderCardComponent } from "./order-card/order-card.component";
import { Router } from '@angular/router';
import { OrderService } from '../../../../state/orders/orders.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
    imports: [CommonModule, MatCheckboxModule, OrderCardComponent]
})
export class OrderComponent {
orderFilter=[
  {value:"PLACED" , label:"Placed"},
  {value:"SHIPPED" , label:"Shipped"},
  {value:"DELIVERED" , label:"Delivered"},
  {value:"CANCELLED" , label:"Cancelled"},
]
orders: any[] = [];



  constructor(
    private router:Router,
    private orderService:OrderService,
    private store:Store<AppState>
    
    ){

  }

  ngOnInit(){
    this.orderService.getOrderHistory()

    this.store.select("order").subscribe((res)=>{
      console.log("order history res" , res.orders)
      this.orders = res.orders
      this.orders = this.orders.slice().reverse()
    })

  }

  navigateToOrderDetails=(id:number)=>{
    this.router.navigate(["order/",id])
  }


}
