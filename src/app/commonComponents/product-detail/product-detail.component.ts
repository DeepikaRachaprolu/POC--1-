import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDataService } from '../../services/product-data.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../app/ActionTypes';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: any;

  quantity: number = 1;
  isCartAnimating = false;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductDataService,
    private cartService: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe(data => {
      this.product = data;
    });
  }
 



addToCart() {
  const item = {
    ...this.product,
    quantity: this.quantity
  };
  this.cartService.addItemToCart(item);
  this.store.dispatch(UserActions.addCartItem({ cartitems: item }));

  this.isCartAnimating = true;


  setTimeout(() => {
    this.isCartAnimating = false;
  }, 3000);
}



}
