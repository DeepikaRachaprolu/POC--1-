import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './ActionTypes';

export interface ProductState {
  allProducts: any[];
  paginatedProducts: any[];
  total: number;
  loading: boolean;
  error: any;
}

export const initialState: ProductState = {
  allProducts: [],
  paginatedProducts: [],
  total: 0,
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductActions.loadProductsSuccess, (state, { products, total }) => ({
    ...state,
    allProducts: products,
    paginatedProducts: products.slice(0, 10),
    total,
    loading: false
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProductActions.searchItems, (state, { searchElement }) => {
    const filtered = state.allProducts.filter(product =>
      product.title.toLowerCase().includes(searchElement.toLowerCase())
    );
    return {
      ...state,
      paginatedProducts: filtered.slice(0, 10),
    };
  }),

  on(ProductActions.sortItems, (state, { sortValue }) => {
    let sortedProducts = [...state.allProducts];

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
      allProducts: sortedProducts,
      paginatedProducts: sortedProducts.slice(0, 10),
    };
  }),

  on(ProductActions.changePage, (state, { pageIndex, pageSize }) => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const paginated = state.allProducts.slice(start, end);
    return {
      ...state,
      paginatedProducts: paginated
    };
  })
);
