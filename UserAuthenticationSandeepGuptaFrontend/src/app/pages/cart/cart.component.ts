import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart!: Product[];
  order: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cart = this.apiService.getCart();
  }

  removeCart(product: Product, remove: string) {
    this.apiService.addToCart(remove, product);
  }

  orderPlaced() {
    this.order = true;
    this.cart = this.apiService.emptyCart();
    setTimeout(()=>this.order=false, 800);
  }
} 
