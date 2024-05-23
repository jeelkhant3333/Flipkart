import { Component } from '@angular/core';
import { AddressCardComponent } from "../../../share/components/address-card/address-card.component";
import { CommonModule } from '@angular/common';
import { CartItemComponent } from "../../../share/components/cart-item/cart-item.component";
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../state/orders/orders.service';

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
    ]
})
export class PaymentComponent {
products:any

constructor(
    private activatedRoute : ActivatedRoute,
    private orderService : OrderService
){}

ngOnInit(){
    let id = this.activatedRoute.snapshot.paramMap.get("id")
    console.log("id" , id);
    if(id){
        this.orderService.getOrderById(id).subscribe((response)=>{
            // console.log("response",response);
            this.products = response
            
        });
    }
   
    
}

}
