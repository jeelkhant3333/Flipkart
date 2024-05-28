import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-product-card',
  standalone: true,
  imports: [],
  templateUrl: './home-product-card.component.html',
  styleUrl: './home-product-card.component.scss'
})
export class HomeProductCardComponent {

  constructor(private router:Router){}
navigate() {
  console.log("product id" , this.product.id);
  
  // this.router.navigate([`product-details/${this.product.id}`]);
}
@Input() product: any;


}
