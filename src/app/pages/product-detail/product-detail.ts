import { Component, computed, input, model, signal } from '@angular/core';
import { sign } from 'node:crypto';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {
  value = input(0, { alias: 'sliderValue' });
  ngOnInit(): void {
    console.log('Slider Value:', this.value());
  }

  countAhihi = model(0);

  increment() {
    this.countAhihi.set(this.countAhihi() + 1);
  }

  check = signal(15);
  check2 = computed(() => this.check() * 3);
}
