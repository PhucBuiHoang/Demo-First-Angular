import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Products
    },
    {
        path: 'cart',
        component: Cart
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
];
