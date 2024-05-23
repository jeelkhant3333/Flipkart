import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from './module/feature/components/home/home.component';
import { FooterComponent } from './module/share/components/footer/footer.component';
import { NavbarComponent } from './module/share/components/navbar/navbar.component';
import { ProductsComponent } from "./module/feature/components/products/products.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { AppState } from './models/AppState';
import { UserService } from './state/user/user.service';
import { CartService } from './state/cart/cart.service';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent, ProductsComponent, HttpClientModule]
})
export class AppComponent {
  title = 'eccomerce-angular';

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private store: Store<AppState>,
    private http: HttpClient,
    private dilouge: MatDialog,
  ) {

  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('jwt')) {
      this.userService.getUserProfile(this.http);
      this.cartService.getCart().subscribe()
    }
  }

}
