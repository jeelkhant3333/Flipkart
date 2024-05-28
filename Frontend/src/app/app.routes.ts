import { Routes } from '@angular/router';
import { HomeComponent } from './module/feature/components/home/home.component';
import { ProductsComponent } from './module/feature/components/products/products.component';
import { CartComponent } from './module/feature/components/cart/cart.component';
import { ProductDetailsComponent } from './module/feature/components/product-details/product-details.component';
import { CheckoutComponent } from './module/feature/components/checkout/checkout.component';
import { PaymentComponent } from './module/feature/components/payment/payment.component';
import { PaymentSuccessComponent } from './module/feature/components/payment-success/payment-success.component';
import { OrderComponent } from './module/feature/components/order/order.component';
import { OrderDetailsComponent } from './module/feature/components/order-details/order-details.component';
import { AdminModule } from './module/admin/admin.module';
import { AuthComponent } from './module/auth/auth.component';

export const routes: Routes = [
    {path:"admin" ,  loadChildren:()=>import("./module/admin/admin-routing.module").then(m=>AdminModule)},
    {path:"" , component:HomeComponent},
    {path:"auth" , component:AuthComponent},
    {path:"cart" , component:CartComponent},
    {path:"product-details/:id" , component:ProductDetailsComponent},
    {path:"checkout" , component:CheckoutComponent},
    {path:"checkout/payment/:id" , component:PaymentComponent},
    {path:"payment-sucess" , component:PaymentSuccessComponent},
    {path:":levelOne/:levelTwo/:levelThree" , component:ProductsComponent},
    {path:"account/orders" , component:OrderComponent},
    {path:"order/:id" , component:OrderDetailsComponent},
    
    


    
];
