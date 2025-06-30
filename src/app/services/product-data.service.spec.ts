import { TestBed } from '@angular/core/testing';

import { ProductDataService } from './product-data.service';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductDataService', () => {
  let service: ProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ ],
      providers: [ provideHttpClient(withInterceptorsFromDi())]
    });
    service = TestBed.inject(ProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
