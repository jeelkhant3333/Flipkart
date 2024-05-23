import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-product-card',
  standalone: true,
  imports: [],
  templateUrl: './home-product-card.component.html',
  styleUrl: './home-product-card.component.scss'
})
export class HomeProductCardComponent {
@Input() product: any;

}
