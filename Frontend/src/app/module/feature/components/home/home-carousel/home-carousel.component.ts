import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mainCarouselData } from '../../../../../../Data/MainCarouselData';

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [RouterModule , CommonModule],
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.scss'
})
export class HomeCarouselComponent {
  carouselData:any;
  currentSlide=0;
  interval:any; 

  ngOnInit(){
    this.carouselData = mainCarouselData;
    // this.autoPlay();
  }


  autoPlay(){
    setInterval(()=>{
      this.nextSlide();
    },2000)
  }
  
  nextSlide() {
   this.currentSlide = (this.currentSlide+1) % this.carouselData.length
  }

}
