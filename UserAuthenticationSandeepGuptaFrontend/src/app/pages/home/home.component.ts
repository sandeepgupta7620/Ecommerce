import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  allProduct!: Product[];

  constructor(private apiService: ApiService, private router : Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getAllProduct().subscribe(success => {
      this.allProduct=success.$values;
      console.log(this.allProduct);
    })
  }

  Product(productId: number){
    this.router.navigateByUrl(`/product/${productId}`);
  } 
}