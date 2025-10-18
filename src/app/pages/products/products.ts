import { Component, inject, OnDestroy, OnInit, signal, NgModule } from '@angular/core';
import { Service } from '../../service/service';
import { CartItem, Category, Product } from '../../lib/type';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, Subscription, map } from 'rxjs';
import { AuthService } from '../../service/auth.service';
// import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  // Option cho *ngFor
  // productList: Product[] = [];

  // Option cho @for(prodct of productList; track $index)
  productList = signal<Product[]>([]);

  selectedCategoryId: number | null = null;
  selectedCategoryName: string = 'All Product';
  categoryList: Observable<Category[]> = new Observable<Category[]>();
  // toastService = inject(ToastService);
  // subscriptionList: Subscription[] = [];

  service = inject(Service)
  authService = inject(AuthService)

  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList = this.service.getAllCategory();
  }

  getProductByCategory(categoryId: number, categoryName: string) {
    this.selectedCategoryId = categoryId;
    this.selectedCategoryName = categoryName;
    this.service.getAllProductByCategoryId(categoryId).subscribe((res: Product[]) => {
      this.productList.set(res);
    })
  }

  loadAllProducts() {
    this.selectedCategoryId = null;
    this.selectedCategoryName = 'All Product';
    this.service.getAllProducts().subscribe((res: Product[]) => {
      this.productList.set(res);
    });
  }

  // ngOnDestroy(): void {
  //   this.subscriptionList.forEach(element => {
  //     element.unsubscribe()
  //   })
  // }
  addToCart(product: Product) {
    if (!this.authService.isLoggedIn()) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.service.getCartItems().subscribe((cartItems: CartItem[]) => {
      const existingItem = cartItems.find(
        item => item.productId === product.id && item.id === currentUser.id
      );

      if (existingItem) {
        this.service.updateCartItem(existingItem.id, {
          quantity: existingItem.quantity + 1
        }).subscribe({
          next: () => {
            alert('Item has been added to the cart!');
          },
          error: (err) => {
            console.error('Error when updating cart item:', err);
            alert('Failed to update cart item. Please try again.');
          }
        });
      } else {
        const newCartItem: Omit<CartItem, 'id'> = {
          productId: product.id,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.image
        };

        this.service.addToCart(newCartItem).subscribe({
          next: () => {
            alert('Item has been added to the cart!');
          },
          error: (err) => {
            console.error('Error when adding to cart:', err);
            alert('Failed to add item to cart. Please try again.');
          }
        });
      }
    });
  }
}
