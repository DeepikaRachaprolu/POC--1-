import { createReducer, on } from '@ngrx/store';
import * as UserActions from './ActionTypes';

export interface CartState {
  cartItems: any[]; 
  totalamount: number;
}

export const initialCartState: CartState = {
  cartItems: [],
  totalamount: 0,
};

export const CartReducer = createReducer(
  initialCartState,


  on(UserActions.addCartItem, (state, { cartitems }) => {
    const existingItem = state.cartItems.find(item => item.id === cartitems.id);

    if (existingItem) {
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === cartitems.id
            ? { ...item, quantity: item.quantity + cartitems.quantity }
            : item
        )
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, cartitems]
      };
    }
  }),

  on(UserActions.updateCartItemQuantity, (state, { itemId, quantity }) => {
  return {
    ...state,
    cartItems: state.cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
  };
}),

on(UserActions.TotalCartamount, (state) => {
  const total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
   return{
    ...state,
    totalamount : total
   }
}),
 
  on(UserActions.removeCartItem, (state, { itemId }) => ({
    ...state,
    cartItems: state.cartItems.filter(item => item.id !== itemId)
    
  })),

   
  on(UserActions.clearCart, state => ({
    ...state,
    cartItems: []
  }))
);
