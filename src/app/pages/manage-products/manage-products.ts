import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, Product, ProductWithCategory } from '../../lib/type';
import { combineLatest, map, Observable } from 'rxjs';
import { Service } from '../../service/service';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css'
})
export class ManageProducts {
  productList = signal<ProductWithCategory[]>([]);
  categoryList: Observable<Category[]> = new Observable<Category[]>();

  selectedProduct = signal<ProductWithCategory>({} as ProductWithCategory);
  isEditing = signal(false);
  showForm = signal(false);

  private productService = inject(Service);

  formTitle = signal('Add New Product');

  ngOnInit(): void {
    this.categoryList = this.productService.getAllCategory();
    this.loadProducts();
  }

  loadProducts(): void {
    combineLatest([
      this.productService.getAllProducts(),
      this.categoryList
    ]).pipe(
      map(([products, categories]) => {
        return products.map(product => {
          const category = categories.find(cat => String(cat.id) === String(product.categoryId));
          return {
            ...product,
            categoryName: category ? category.name : 'Unknown'
          } as ProductWithCategory;
        });
      })
    ).subscribe({
      next: (combinedProducts) => this.productList.set(combinedProducts),
      error: (err) => console.error('Error loading combined products:', err)
    });
  }

  editProduct(product: ProductWithCategory): void {
    this.isEditing.set(true);
    this.showForm.set(true);
    this.formTitle.set('Edit Product');
    this.selectedProduct.set({ ...product });
  }

  addNewProduct(): void {
    this.isEditing.set(false);
    this.showForm.set(true);
    this.formTitle.set('Add New Product');
    this.selectedProduct.set({
      id: 0,
      name: '',
      price: 0,
      quantity: 0,
      categoryId: 0,
      image: '',
      categoryName: ''
    });
  }

  saveProduct(): void {
    const product = this.selectedProduct();

    if (this.isEditing()) {
      this.productService.updateProduct(product?.id as number, product as Product).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.loadProducts();
          this.cancelForm();
        },
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this.productService.createProduct(product as Product).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.loadProducts();
          this.cancelForm();
        },
        error: (err) => console.error('Error adding product:', err)
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.removeProduct(id).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts();
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }

  cancelForm(): void {
    this.isEditing.set(false);
    this.selectedProduct.set({} as ProductWithCategory);
    this.showForm.set(false);
  }
}