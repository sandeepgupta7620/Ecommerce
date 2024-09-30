import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-update.component.html',
  styleUrl: './cart-update.component.scss'
})
export class CartUpdateComponent implements OnInit, OnDestroy {
  cartCount: number=0;
  protected _onDestroy = new Subject<void>();

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}