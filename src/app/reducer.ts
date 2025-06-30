import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './ActionTypes';


export interface ProductState {
  products: any[];
  allproducts: any[]

}

export const initialState: ProductState = {
  products : [],
  allproducts: []
 
};

export const productReducer = createReducer(
  initialState,
  on(CounterActions.getall, (state, {products}) => ( {...state, products,allproducts: products})),

  on(CounterActions.searchitems, (state, {searchElement}) => {
    return {
      ...state,
      products: state.allproducts.filter(product => 
          product.title.toLowerCase().includes(searchElement.toLowerCase())
        )
    }
  })
);




 
