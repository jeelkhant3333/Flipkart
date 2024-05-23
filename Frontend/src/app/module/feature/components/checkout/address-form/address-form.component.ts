import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddressCardComponent } from "../../../../share/components/address-card/address-card.component";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { OrderService } from '../../../../../state/orders/orders.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
  imports: [
    CommonModule, 
    MatButtonModule, 
    AddressCardComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,]
})
export class AddressFormComponent {
  

  constructor(
    private formBuilder:FormBuilder,
    private orderService:OrderService,
    ){
  
  }

  addresses = [1, 1, 1,1,1,1]
  myForm: FormGroup=this.formBuilder.group({
    firstName:["" , Validators.required],
    lastName:["" , Validators.required],
    StreetAddress:["" , Validators.required],
    city:["" , Validators.required],
    state:["" , Validators.required],
    zipCode:["" , Validators.required],
    mobile:["" , Validators.required],
  })


  handleCreateOrder(_t7: any) {
    throw new Error('Method not implemented.');
  }

  handleSubmit() {
    const formValues = this.myForm.value
    this.orderService.createOrder(formValues)
    // console.log("Data " ,formValues)
  }


}
