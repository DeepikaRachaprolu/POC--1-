import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/CartItem.model'; 
import { Store } from '@ngrx/store';
import { selectedCartItems, selectTotalAmount } from '../../selectors';
import { Observable } from 'rxjs';
import * as UserActions from '../../../app/ActionTypes';


@Component({
  selector: 'app-view-cart',
  imports: [ CommonModule],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent {
   storeresponse!: Observable<CartItem[]>;
   totalamount!: Observable<number>;  

constructor(
   
    private cartService: CartService,
    private store: Store


  ) {}

  items : any = [];

  ngOnInit(){

     this.items = this.cartService.getCartItems();
      this.storeresponse = this.store.select(selectedCartItems);
     console.log("items",this.store.select(selectedCartItems));
     this.totalamount = this.store.select(selectTotalAmount);
     console.log("yhs", this.totalamount);
     this.store.dispatch(UserActions.TotalCartamount());
  }


  increaseQty(item: any) {
  this.store.dispatch(UserActions.updateCartItemQuantity({ 
    itemId: item.id, 
    quantity: item.quantity + 1 
  }));
  this.store.dispatch(UserActions.TotalCartamount());
}

decreaseQty(item: any) {
  if (item.quantity > 1) {
    this.store.dispatch(UserActions.updateCartItemQuantity({ 
      itemId: item.id, 
      quantity: item.quantity - 1 
    }));
    this.store.dispatch(UserActions.TotalCartamount());
  }

}


 

  deleteItem(item: any) {
    // this.cartService.removeItem(index);
    // this.items = this.cartService.getCartItems();
    this.store.dispatch(UserActions.removeCartItem({itemId: item.id}));
     this.storeresponse = this.store.select(selectedCartItems);
     this.store.dispatch(UserActions.TotalCartamount());
     this.totalamount = this.store.select(selectTotalAmount);
  }
}
