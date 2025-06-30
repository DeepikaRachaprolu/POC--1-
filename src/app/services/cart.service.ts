import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  addItemToCart(item: any) {
    const existing = this.cart.find(p => p.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
  }

  getCartItems() {
    return this.cart;
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }

  clearCart() {
    this.cart = [];
  }
}
