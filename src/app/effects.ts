import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './ActionTypes';
import { ProductDataService } from './services/product-data.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions: Actions,
    private productService: ProductDataService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getallProducts().pipe(
          map((allProducts: any[]) =>
            ProductActions.loadProductsSuccess({
              products: allProducts,
              total: allProducts.length,
            })
          ),
          catchError(error =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );
}
