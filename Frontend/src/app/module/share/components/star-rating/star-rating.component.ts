import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {

  maxRating=5;
  initialRating=3;

  stars:any;
  currentRating=0

  constructor(){
    this.stars = Array(this.maxRating).fill(0).map((_,i)=>i+1);
    this.currentRating = this.initialRating;
  }

  rate(rating:number){
    this.currentRating = rating;
  }
}
