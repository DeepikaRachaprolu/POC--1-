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
      mergeMap(({ pageIndex, pageSize }) =>
        this.productService.getallProducts().pipe(
          map((allProducts: any) => {
            const start = pageIndex * pageSize;
            const end = start + pageSize;
            const paginated = allProducts.slice(start, end);
            return ProductActions.loadProductsSuccess({
              products: paginated,
              total: allProducts.length,
            });
          }),
          catchError(error =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );
}
