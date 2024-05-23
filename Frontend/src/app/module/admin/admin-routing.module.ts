import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminComponent } from './components/admin.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderTableComponent } from './components/order-table/order-table.component';

const routes: Routes = [
  {path:"",component:AdminComponent,children:[
    {path:"",component:DashboardComponent},
    { path:"products", component:AdminProductsComponent},
    { path:"orders",component:OrderTableComponent},
    { path:"customers",component:CustomersComponent},
    { path:"add-product",component:AddProductComponent}
 ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
