import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  backendUrl = environment.backendUrl;
  cart: Product[] = [];
  constructor(private http: HttpClient) { }

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$: Observable<number> = this.cartCountSubject.asObservable();


  getAllProduct(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/allProduct`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/singleProduct`, {
      params: {
        productId: id
      }
    });
  }

  getProductByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/category`, {
      params: {
        productCategory: category
      }
    });
  }

  

getOperation(productId:number){
  if(!this.cart.find(value=>value.productId==productId)){
    return 'Add to Cart';
  }
  return 'Remove From Cart';
}

  addToCart(action: string, SingleProduct: Product) {
    if (action == 'Add to Cart') {
      if (this.cart.indexOf(SingleProduct) == -1) {
        this.cart.push(SingleProduct);
        this.updateCartCount();
      }
    } else if (action == 'Remove From Cart') {
      const index = this.cart.indexOf(SingleProduct);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.updateCartCount();
      }
    }
  }

  getCart() {
    return this.cart;
  }


  updateCartCount() {
    this.cartCountSubject.next(this.cart.length);
  }

  emptyCart() {
    this.cart = [];
    this.updateCartCount();
    return this.cart;
  }
}
