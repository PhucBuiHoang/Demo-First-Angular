export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    categoryId: number;
    image: string;
}
export interface ProductWithCategory extends Product {
    categoryName: string;
}
export interface Category {
    id: number;
    name: string;
}

export interface CartItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
}

export class LoginModel {
    email: string = '';
    password: string = '';
}