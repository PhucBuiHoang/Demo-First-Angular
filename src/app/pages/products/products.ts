import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Service } from '../../service/service';
import { APIResposneModel, Category, Product } from '../../lib/type';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit, OnDestroy {
  // Option cho *ngFor
  // productList: Product[] = [];

  // Option cho @for(prodct of productList; track $index)
  productList = signal<Product[]>([]);

  categoryList: Observable<Category[]> = new Observable<Category[]>()
  subscriptionList: Subscription[] = [];

  service = inject(Service)

  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList = this.service.getAllCategory().pipe(
      map(item => item.data)
    )
  }

  getProductByCategory(categoryId: number) {
    this.service.getAllProductByCategoryId(categoryId).subscribe((res: APIResposneModel) => {
      this.productList.set(res.data);
    })
  }

  loadAllProducts() {
    this.service.getAllProducts().subscribe((res: APIResposneModel) => {
      // this.productList = res.data;
      // if (res && res.data) {
      //   this.productList = res.data.filter((p: any) => p.productShortName.toLowerCase().includes("watch"));
      // }

      this.productList.set(res.data);
      // this.productList.set(
      //   res.data.filter((p: Product) => p.productShortName.toLowerCase().includes("watch"))
      // );
    })
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(element => {
      element.unsubscribe()
    })
  }
}
