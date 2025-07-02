import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './ActionTypes';

export interface ProductState {
  products: any[];
  total: number;
  loading: boolean;
  error: any;
}

export const initialState: ProductState = {
  products: [],
  total: 0,
  loading: false,
  error: null
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

 
  on(ProductActions.loadProductsSuccess, (state, { products, total }) => ({
    ...state,
    products,
    total,
    loading: false
  })),

  
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(ProductActions.searchItems, (state, { searchElement }) => ({
    ...state,
    products: state.products.filter(product =>
      product.title.toLowerCase().includes(searchElement.toLowerCase())
    )
  })),

  on(ProductActions.sortItems, (state, { sortValue }) => {
    let sortedProducts = [...state.products];

    switch (sortValue) {
      case 'priceLowHigh':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'ratingHighLow':
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'ratingLowHigh':
        sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
    }

    return {
      ...state,
      products: sortedProducts
    };
  })
);
