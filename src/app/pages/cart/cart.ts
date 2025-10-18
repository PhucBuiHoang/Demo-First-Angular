import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../service/service';
import { Router } from '@angular/router';
import { CartItem } from '../../lib/type';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  cartItems = signal<CartItem[]>([]);
  service = inject(Service);
  router = inject(Router);

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.service.getCartItems().subscribe({
      next: (items: CartItem[]) => {
        this.cartItems.set(items);
      },
      error: (err) => {
        console.error('Error when loading cart items:', err);
      }
    });
  }

  updateQuantity(item: CartItem, delta: number): void {
    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      this.removeItem(item.id);
      return;
    }

    const changes = { quantity: newQuantity };

    this.service.updateCartItem(item.id, changes).subscribe({
      next: () => {
        this.cartItems.update(items => items.map(i =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        ));
      },
      error: (err) => {
        console.error('Error when updating quantity:', err);
        alert('Failed to update quantity. Please try again.');
      }
    });
  }

  removeItem(itemId: number): void {
    const confirmation = window.confirm('Are you sure you want to remove this item from the cart?');

    if (!confirmation) {
      return;
    }

    this.service.removeCartItem(itemId).subscribe({
      next: () => {
        this.cartItems.update(items => items.filter(i => i.id !== itemId));
        alert('Item has been removed from the cart.');
      },
      error: (err) => {
        console.error('Error removing item:', err);
        alert('Failed to remove item. Please try again.');
      }
    });
  }

  calculateTotal(): number {
    return this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
