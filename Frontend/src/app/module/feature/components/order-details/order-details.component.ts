import { Component } from '@angular/core';
import { AddressCardComponent } from "../../../share/components/address-card/address-card.component";
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from "../order/order-card/order-card.component";
import { OrderTrackerComponent } from "../../../share/components/order-tracker/order-tracker.component";

@Component({
    selector: 'app-order-details',
    standalone: true,
    templateUrl: './order-details.component.html',
    styleUrl: './order-details.component.scss',
    imports: [AddressCardComponent, CommonModule, OrderCardComponent, OrderTrackerComponent]
})
export class OrderDetailsComponent {
    orders = [1, 1, 1];

    steps=[
        {id:0 , title:"PLACED" , isCompleted:true},
        {id:1 , title:"CONFIREMD" , isCompleted:true},
        {id:2 , title:"SHIPPED" , isCompleted:true},
        {id:3 , title:"DELIVERED" , isCompleted:false},
    ]

}
