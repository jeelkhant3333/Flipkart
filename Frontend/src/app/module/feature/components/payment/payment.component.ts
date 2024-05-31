import { Component } from '@angular/core';
import { AddressCardComponent } from "../../../share/components/address-card/address-card.component";
import { CommonModule } from '@angular/common';
import { CartItemComponent } from "../../../share/components/cart-item/cart-item.component";
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../state/orders/orders.service';
import { Store } from '@ngrx/store';
import { OrderState } from '../../../../state/orders/orders.reducer';
import { OrderCardComponent } from "../order/order-card/order-card.component";
import { PaymentCardComponent } from "./payment-card/payment-card.component";
import { PaymentService } from '../../../../state/payment/payment.service';

@Component({
    selector: 'app-payment',
    standalone: true,
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss',
    imports: [
        AddressCardComponent,
        CommonModule,
        CartItemComponent,
        MatDividerModule,
        OrderCardComponent,
        PaymentCardComponent
    ]
})
export class PaymentComponent {

products:any

constructor(
    private activatedRoute : ActivatedRoute,
    private orderService : OrderService,
    private store : Store<OrderState>,
    private paymentService : PaymentService
){}

ngOnInit(){
    let id = this.activatedRoute.snapshot.paramMap.get("id")
    // console.log("id" , id);
    if(id){
        this.orderService.getOrderById(id)
    }


    this.store.select('order').subscribe((res)=>{
        console.log("order" , res.order)
        this.products = res.order
    })
    
}

navigetToPayment() {
    console.log("go to payment");
    
    this.paymentService.createPayment(this.products.id)
   
    }

}
