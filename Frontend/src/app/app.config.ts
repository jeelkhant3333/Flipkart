import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { cartReducer } from './state/cart/cart.reducer';
import { CartEffect } from './state/cart/cart.effect';
import { authReducer } from './state/auth/auth.reducers';
import { userReducer } from './state/user/user.reducer';
import { productReducer } from './state/product/product.reducer';
import { orderReducer } from './state/orders/orders.reducer';
import { paymentReducer } from './state/payment/payment.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideStore(
      {'cart':cartReducer,
      'auth':authReducer,
      'user':userReducer,
      'product':productReducer,
      'order':orderReducer,
      'payment': paymentReducer
    }
      ), 
    provideHttpClient(withFetch()), 
    provideStoreDevtools({ maxAge: false, logOnly: !isDevMode() }), 
    provideEffects([CartEffect])
  ]
};
