import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './ActionTypes';

export interface ProductState {
  products: any[];
  allproducts: any[];
}

export const initialState: ProductState = {
  products: [],
  allproducts: []
};

export const productReducer = createReducer(
  initialState,

  on(CounterActions.getall, (state, { products }) => ({
    ...state,
    products,
    allproducts: products
  })),


  on(CounterActions.searchitems, (state, { searchElement }) => ({
    ...state,
    products: state.allproducts.filter(product =>
      product.title.toLowerCase().includes(searchElement.toLowerCase())
    )
  })),

 
  on(CounterActions.sortItems, (state, { sortValue }) => {
    let sortedProducts = [...state.allproducts]; 

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
