import { Routes } from '@angular/router';
import { CreateOrder } from './pages/create-order/create-order';
import { Products } from './pages/products/products';
import { MyOrders } from './pages/my-orders/my-orders';

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
        path: 'create-order',
        component: CreateOrder
    },
    {
        path: 'my-order',
        component: MyOrders
    },
];
