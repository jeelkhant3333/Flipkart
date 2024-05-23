import { Component } from '@angular/core';
import { StarRatingComponent } from "../../../../share/components/star-rating/star-rating.component";

@Component({
    selector: 'app-product-review-card',
    standalone: true,
    templateUrl: './product-review-card.component.html',
    styleUrl: './product-review-card.component.scss',
    imports: [StarRatingComponent]
})
export class ProductReviewCardComponent {

}
