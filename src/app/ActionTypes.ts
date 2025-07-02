import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: any[]; total: number }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);

export const searchItems = createAction(
  '[Products] Search Items',
  props<{ searchElement: string }>()
);

export const sortItems = createAction(
  '[Products] Sort Items',
  props<{ sortValue: string }>()
);

export const changePage = createAction(
  '[Products] Change Page',
  props<{ pageIndex: number; pageSize: number }>()
);


export const addCartItem = createAction(
  '[Cart] Add Item',
  props<{ cartitems: any }>()
);

export const removeCartItem = createAction(
  '[Cart] Remove Item',
  props<{ itemId: number }>()
);

export const updateCartItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ itemId: number; quantity: number }>()
);

export const TotalCartamount = createAction('[Cart] Total Amount');

export const clearCart = createAction('[Cart] Clear Cart');
