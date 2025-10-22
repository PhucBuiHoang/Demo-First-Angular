import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem, Category, Product, User } from '../lib/type';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  removeProduct(id: number | string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${String(id)}`);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`)
  }

  getAllProductByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?categoryId=${categoryId}`)
  }

  // Cart Service
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cartItems`);
  }

  addToCart(item: Omit<CartItem, 'id'>): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/cartItems`, item);
  }

  updateCartItem(id: number, changes: { quantity: number }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cartItems/${id}`, changes);
  }

  removeCartItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cartItems/${id}`);
  }
}
