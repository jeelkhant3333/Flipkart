import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'
import { filters, singleFilter } from './filterData';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ProductCardComponent } from "../../../share/components/product-card/product-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../state/product/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';


@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatRadioModule,
    ProductCardComponent
  ]
})
export class ProductsComponent {
  sortMenu: any;
  filterData: any;
  singleFilterData: any;
  products: any;
  levelThree:any


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilter;

    this.activeRoute.paramMap.subscribe((params) => {
    this.levelThree = params.get("levelThree")
      var reqData = {
        category: params.get("levelThree"),
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 10000,
        minDiscount: 0,
        pageNumber: 0,
        pageSize: 20,
        stock: null,
        sort: null
      }
      this.productService.findProductsByCategory(reqData).subscribe((response) => {
        // console.log("service", response)
        this.products = response.content
      })
    });

    this.activeRoute.queryParams.subscribe((params) => {
      const color = params["color"]
      const size = params['size']
      const price = params["price"]
      const discount = params['discount']
      const stock = params["stock"]
      const sort = params['sort']
      const pageNumber = params["pageNumber"]
      const minPrice = price?.split("-")[0];
      const maxPrice = price?.split("-")[1];

      var reqData = {
        category: this.levelThree,
        colors: color?[color].join(','):[],
        sizes: [size],
        minPrice: minPrice?minPrice:0,
        maxPrice: maxPrice?minPrice:1000000,
        minDiscount: discount?discount:0,
        pageNumber: pageNumber?pageNumber:0,
        pageSize: 20,
        stock: null,
        sort: sort?sort:"price_low"
      }
      this.productService.findProductsByCategory(reqData).subscribe((response) => {
        // console.log("service", response.content)
        this.products = response.content
      })
    }
    )

    // this.store.pipe(select((store) => store.product)).subscribe((product) => {
    //   // console.log("store", this.store)
    //   console.log("product com" , product.products.content)
    //   // this.products = product.products;
    //   // console.log("store data", product.products)
    // });

  }

  handleMultipleSelectFilter(value: string, sectionId: string) {

    const queryParams = { ...this.activeRoute.snapshot.queryParams };

    const filterValues = queryParams[sectionId] ? queryParams[sectionId].split(',') : [];

    const valueIndex = filterValues.indexOf(value);

    if (valueIndex != -1) {
      filterValues.splice(valueIndex, 1)
    } else {
      filterValues.push(value)
    }

    if (filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(",")
    } else {
      delete queryParams[sectionId];
    }

    this.router.navigate([], { queryParams });
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activeRoute.snapshot.queryParams };
    queryParams[sectionId] = value;

    this.router.navigate([], { queryParams });
  }


}
