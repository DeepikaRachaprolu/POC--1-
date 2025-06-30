import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private productData: any = {};
 
  constructor( private http: HttpClient){}
 
  setProductData(data: any): void {
    this.productData = { ...data }; 
  }


  getProductData(): any {
    return { ...this.productData }; 
  }

  clearProductData(): void {
    this.productData = {}; 
  }

  private apiUrl = 'https://fakestoreapi.com/products';

  getallProducts(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/${id}`);
  }
  
}
