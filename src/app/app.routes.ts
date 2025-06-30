import { Routes } from '@angular/router';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { PreviewComponent } from './Admin/preview/preview.component';
import { AdminSignupComponent } from './Admin/admin-signup/admin-signup.component';
import { ProductsComponent } from './commonComponents/products/products.component';
import { ProductDetailComponent } from './commonComponents/product-detail/product-detail.component';
import { ViewCartComponent } from './commonComponents/view-cart/view-cart.component';

export const routes: Routes = [
    { path: 'home', component: AdminHomeComponent },
    { path: '', component:AdminLoginComponent},
    { path:'preview',component:PreviewComponent},
    { path: 'signup', component: AdminSignupComponent},
    { path:'products', component:ProductsComponent},
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'viewcart', component: ViewCartComponent },
];
