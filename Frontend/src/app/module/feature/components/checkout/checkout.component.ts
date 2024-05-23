import { Component } from '@angular/core';
import { AddressFormComponent } from "./address-form/address-form.component";

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
    imports: [AddressFormComponent]
})
export class CheckoutComponent {

}
