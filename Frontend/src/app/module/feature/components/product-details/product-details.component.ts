import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProductReviewCardComponent } from "./product-review-card/product-review-card.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { dressPage1 } from '../../../../../Data/dress/page1';
import { ProductCardComponent } from "../../../share/components/product-card/product-card.component";
import { StarRatingComponent } from "../../../share/components/star-rating/star-rating.component";
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../state/product/product.service';
import { CartService } from '../../../../state/cart/cart.service';
import { log } from 'node:console';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Store, StoreRootModule } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';

@Component({
    selector: 'app-product-details',
    standalone: true,
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss',
    imports: [
        MatRadioModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        ProductReviewCardComponent,
        MatProgressBarModule,
        ProductCardComponent,
        StarRatingComponent,
        MatDividerModule
    ]
})
export class ProductDetailsComponent {

  selectedSize: any;
  reviews = [1,1,1];
  relatedProducts:any;
  product:any
  productId:any

  constructor(
    private router: Router,
    private productService:ProductService,
    private cartService:CartService,
    private activatedRoute:ActivatedRoute,
    private http: HttpClient,
    private store : Store<AppState>
    ){

  }

  ngOnInit(){
    this.relatedProducts = dressPage1;
    const id = this.activatedRoute.snapshot.paramMap.get("id")
    this.productId=id
    this.productService.findProductsById(id).subscribe((response) => {
      // console.log("service", response)
      this.product = response
    })
  }

  handleAddToCart() {
    
    const data = {size:this.selectedSize,productId:this.productId}
    this.cartService.addItemToCart(data)
    .subscribe((response)=>{
      // console.log("data" , response);
    })

    this.cartService.getCart().subscribe((action)=>{
      this.store.dispatch(action)
      //  console.log("cart" , action)

    })
   this.router.navigate(["cart"]);
  }
}
