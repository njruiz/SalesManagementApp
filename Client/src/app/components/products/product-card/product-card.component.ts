import { Component, Input } from '@angular/core';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product;
  
  selectedSize: string;
  sizes: string[] = ['Regular', 'Medium', 'Large'];
  quantity = 0;

  constructor() {
    // Initialize the selected option
    this.selectedSize = this.sizes[0];
  }
  
  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addToCart() {
    // Add your logic to handle adding the product to the cart
  }
}
