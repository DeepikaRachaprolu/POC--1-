import { createAction, props } from '@ngrx/store';


export const getall = createAction('[products] getall', props<{ products: any[]}>());

export const searchitems = createAction('[searchproducts] Search Items', props<{searchElement : string}>());

export const sortItems = createAction('[sortitems] Sort Items', props<{sortValue : string}>());

export const addCartItem = createAction('[Cart] Add Cart', props<{ cartitems: any}> ());

export const removeCartItem = createAction(
  '[Cart] Remove Item',
  props<{ itemId: number }>()
);

export const updateCartItemQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ itemId: number; quantity: number }>()
);



export const TotalCartamount = createAction('[Cart] Total Amount');

export const clearCart = createAction('[Cart] Clear Cart');