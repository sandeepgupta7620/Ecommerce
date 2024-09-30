import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { CartUpdateComponent } from './pages/cart-update/cart-update.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'product/:id', component: ProductComponent , canActivate: [AuthGuard]},
    { path: 'cart-update', component:  CartUpdateComponent, canActivate: [AuthGuard]},
    
    
    { path: 'profile', component: ProfileComponent }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
