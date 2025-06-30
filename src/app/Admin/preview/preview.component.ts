import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from '../../services/product-data.service';

@Component({
  selector: 'app-preview',
  imports: [ CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  image: string = '';
  productName: string = '';
  description: string = '';
  price: number = 0;
  availability: boolean = true; 
  quantity: number = 1;
  offerprice: number = 0;
  offerPercentage : number = 0;
  data : any;
  category : string = '';


  constructor(private router: Router, private productDataService: ProductDataService){

  }

  ngOnInit() {
    const navigationState = history.state;
    if (navigationState) {
      this.productName = navigationState.productName;
      this.description = navigationState.description;
      this.image = navigationState.image;
      this.price = navigationState.price;
      this.offerprice = navigationState.offerprice;
      this.quantity = navigationState.quantity;
       this.category = navigationState.category;
    }
   this.data ={productName: this.productName, 
    description: this.description,
    image : this.image,
    price: this.price,
    offerprice: this.offerprice,
    quantity: this.quantity,
    category:this.category
   }
     this.productDataService.setProductData( this.data)
    this.offerPercentage = (this.price / this.offerprice) ;
  }

  availableQuantities(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  Editclicked(){
    this.router.navigate(['/home']);
  }
}
