import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResposneModel } from '../lib/type';

@Injectable({
  providedIn: 'root'
})
export class Service {
  apiUrl: string = "https://freeapi.miniprojectideas.com/api/BigBasket/";

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<APIResposneModel> {
    // return this.http.get<APIResposneModel>(this.apiUrl + "GetAllProducts")
    return this.http.get<APIResposneModel>('/api/BigBasket/GetAllProducts')
  }

  getAllCategory(): Observable<APIResposneModel> {
    // return this.http.get<APIResposneModel>(this.apiUrl + "GetAllCategory")
    return this.http.get<APIResposneModel>('/api/BigBasket/GetAllCategory')
  }

  getAllProductByCategoryId(categoryId: number): Observable<APIResposneModel> {
    // const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`
    return this.http.get<APIResposneModel>(`/api/BigBasket/GetAllProductsByCategoryId?id=${categoryId}`)
  }

}
