// user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './reducer';
import { CartState } from './cart.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');
 export const selectedCartItemsState = createFeatureSelector<CartState>('cart');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.paginatedProducts
);

export const totalProductCount = createSelector(
  selectProductState,
  (state) => state.total
);

export const selectedCartItems = createSelector(
  selectedCartItemsState,
  (state) => state.cartItems
)

export const selectTotalAmount = createSelector(
  selectedCartItemsState,
  (state) => state.totalamount
);



