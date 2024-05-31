import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';
import { OrderService } from '../../../../state/orders/orders.service';
import { PaymentService } from '../../../../state/payment/payment.service';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../../../share/components/address-card/address-card.component';
import { PaymentState } from '../../../../state/payment/payment.reducer';
import { OrderState } from '../../../../state/orders/orders.reducer';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule,AddressCardComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent {


  orderId: any
  paymentId: any
  order:any;
  orderItems!:any[] ;
  address:any

  constructor(private orderService: OrderService, private paymentService: PaymentService, private route: ActivatedRoute, private store: Store<PaymentState>) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['order_id']
      this.paymentId = params['razorpay_payment_id']
    })
    this.orderService.getOrderById(this.orderId)
    this.paymentService.updatePayment({
      orderId: this.orderId,
      paymentId: this.paymentId
    })

    this.store.select('order').subscribe((res)=>{
      this.order = res.order
      this.orderItems  = res.order.orderItems
      this.address = res.order.shippingAddress
    })
  }


}
