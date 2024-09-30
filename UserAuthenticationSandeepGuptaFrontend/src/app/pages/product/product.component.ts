import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,MatProgressBarModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  productId!: number;
  SingleProduct!: Product;
  sameProduct!: Product[];
  operation: string = 'Add to Cart';
  isLoading: boolean = false;
  cart!: Product[];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    // Get the productId from the route parameter when the component is initialized
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
      console.log(this.productId); // '+' converts the string to a number
      this.operation = this.apiService.getOperation(this.productId);
      this.cart = this.apiService.getCart();
      this.singleProduct(); // Fetch product details
    });
  }

  singleProduct() {
    this.apiService.getProduct(this.productId).subscribe(success => {
      this.SingleProduct = success;
      this.productByCategory();
    });
  }

  productByCategory() {
    const category = this.SingleProduct.productCategory;
    this.apiService.getProductByCategory(category).subscribe(success => {
      console.log(success); // Log to inspect the API response
  
      // Access the $values array from the response
      if (success && success["$values"] && Array.isArray(success["$values"])) {
        this.sameProduct = success["$values"]; // Assign the array correctly
        // Ensure the current product is removed from the list
        const index = this.sameProduct.findIndex(u => u.productId === this.SingleProduct.productId);
        if (index > -1) {
          this.sameProduct.splice(index, 1); // Remove the current product from the same product array
        }
      } else {
        console.error("Error: Response does not contain $values array", success);
        this.sameProduct = []; // Fallback in case the response is not valid
      }
      this.isLoading = true; // Show the progress bar after data is loaded
    });
  }
  

  addCart(operation: string) {
    this.apiService.addToCart(operation, this.SingleProduct);
    if (operation === 'Add to Cart') {
      this.operation = 'Remove From Cart';
      this.toastr.success('Product added to Cart Successfully!','Success');
    } else if (operation === 'Remove From Cart') {
      this.operation = 'Add to Cart';
      this.toastr.success('Product removed from Cart Successfully!','Success');

    }
  }

  Product(productId: number) {
    this.isLoading = false;
    this.router.navigateByUrl(`/product/${productId}`);
  }
}