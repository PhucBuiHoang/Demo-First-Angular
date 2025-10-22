import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AuthGuard } from './service/auth.guard';
import { ManageProducts } from './pages/manage-products/manage-products';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Products,
        title: 'Product List'
    },
    {
        path: 'manage-products',
        component: ManageProducts,
        canActivate: [AuthGuard],
        title: 'Manage Products'
    },
    {
        path: 'cart',
        component: Cart,
        canActivate: [AuthGuard],
        title: 'Shopping Cart'
    },
    {
        path: 'login',
        component: Login,
        title: 'Login'
    },
    {
        path: 'register',
        component: Register,
        title: 'Register'
    },
];
