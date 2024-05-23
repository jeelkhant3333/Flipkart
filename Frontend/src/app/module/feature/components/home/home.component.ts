import { Component } from '@angular/core';
import { HomeCarouselComponent } from "./home-carousel/home-carousel.component";
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { gounsPage1 } from '../../../../../Data/Gouns/gouns';
import { meanJeans } from '../../../../../Data/Men/men_jeans';
import { mens_kurta } from '../../../../../Data/Men/men_kurta';
import { womenTop } from '../../../../../Data/Women/women_top';
import { mensShoesPage1 } from '../../../../../Data/shoes';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HomeCarouselComponent, ProductSliderComponent]
})
export class HomeComponent {
    menJeans: any;
    womenTop: any;
    womengouns: any;
    menKurtas: any;
    shoes: any;

    ngOnInit() {
        this.menJeans = meanJeans.slice(0, 6)
        this.womengouns = gounsPage1.slice(0,6)
        this.menKurtas = mens_kurta.slice(0, 6)
        this.shoes = mensShoesPage1.slice(0, 6)
        this.womenTop = womenTop.slice(0, 6)
    }
}
