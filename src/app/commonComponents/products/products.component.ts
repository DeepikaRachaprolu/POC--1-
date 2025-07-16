import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ProductDataService } from '../../services/product-data.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ObjectDetectionService } from '../../services/object-detection.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgZone } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../app/ActionTypes';
import { selectProducts, totalProductCount, selectedCartItems } from '../../selectors';
import { CurrenyPipe } from "../../pipe/curreny.pipe";
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatPaginatorModule, MatSelectModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule, CurrenyPipe],
  providers: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  
})
export class ProductsComponent {
  
  stars: number[] = [1, 2, 3, 4, 5];
  searchValue : string ='';
  pageSize = 10;
currentPage = 0;
products: any[] = [];
allproducts: any[] = [];  
paginatedProducts: any[] = [];
selectedSort: string = '';
detections: any[] = [];
image: HTMLImageElement | undefined;
isLoading: boolean = false;
isAdmin: boolean =  true;
storeresponse : any;
totalProductsCount: Observable<number> = new Observable();
cartCount$!: Observable<number>;

isSpeechRecognitionSupported: boolean = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
@ViewChild('noResultsDialog') noResultsDialog!: TemplateRef<any>;




    constructor( private productDataService: ProductDataService, private objectDetectionService:ObjectDetectionService, private dialog: MatDialog,   private ngZone: NgZone, private router:Router, private store: Store){
   this.storeresponse = this.store.select(selectProducts);
    }


ngOnInit() {
  this.store.dispatch(UserActions.loadProducts());
  this.storeresponse = this.store.select(selectProducts);
  this.totalProductsCount = this.store.select(totalProductCount);
  this.cartCount$ = this.store.select(selectedCartItems).pipe(
    map(items => items ? items.length : 0)
  );
}

  
    searchupload: FormGroup = new FormGroup({
      search: new FormControl('', Validators.required),
      fileupload: new FormControl(null, Validators.required),
    
    });


    getFilledStars(rating: number): number {
      return Math.floor(rating); 
    }

    Search(event: any) {
      const value = event.target.value;
      this.store.dispatch(UserActions.searchItems({ searchElement: value }));
    }

   
    
  onPageChange(event: any) {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.store.dispatch(UserActions.changePage({
    pageIndex: this.currentPage,
    pageSize: this.pageSize
  }));
}

 onSortChange(sortValue: string) {
  this.selectedSort = sortValue;
  this.store.dispatch(UserActions.sortItems({ sortValue }));
  this.currentPage = 0;
  this.store.dispatch(UserActions.changePage({
    pageIndex: this.currentPage,
    pageSize: this.pageSize
  }));
}

    

    startVoiceSearch() {
      if (!this.isSpeechRecognitionSupported) {
        alert('Your browser does not support voice search');
        return;
      }
    
  
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US'; 

      recognition.start();
     this.isLoading = true;
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript; 
        // this.searchupload.patchValue({
        //   search: transcript 
        // });
        this.ngZone.run(() => {
          this.performSearch(transcript);
        });
      };
  
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error: ', event.error);
      };
    }

    performSearch(query: string) {
      console.log('Searching for: ', query);
      this.products = this.allproducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log("this.products", this.products);
      this.isLoading = false;
    }
    

    openFileInput() {
      this.fileInput.nativeElement.click(); 
    }

    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        console.log(file);
        this.createImageFromFile(file).then(image => {
          this.image = image;
          this.detectFrame();
        }).catch(error => {
          console.error(error);
        });
      }
    }
  
    detectFrame() {
      if (this.image) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = this.image.width;
          canvas.height = this.image.height;
          ctx.drawImage(this.image, 0, 0);
          this.objectDetectionService.detectObjects(canvas)
            .then(detections => {
              this.detections = detections;
              console.log("detections", detections);''
              const detectedClasses = detections.map(detection => detection.class.toLowerCase());
              
          
              this.products = this.allproducts.filter(product => 
                detectedClasses.some(detectedClass => 
                  product.title.toLowerCase().includes(detectedClass)
                )
              );
              if (this.products.length <= 0) {
                this.dialog.open(this.noResultsDialog); 
              }
            })
            .catch(error => {
              console.error('Error detecting objects:', error);
            });
        }
      }
    }
    
  
    private createImageFromFile(file: File): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;
          img.onload = () => resolve(img);
          img.onerror = (error) => reject('Image loading error: ' + error);
        };
        reader.onerror = (error) => reject('FileReader error: ' + error);
        reader.readAsDataURL(file);
      });
    }

    Close(){
      this.dialog.closeAll();
      // this.updatePaginatedProducts() 
    }


    productsupload(){
      console.log("entering");
      this.router.navigate(['/home']);
    }

    goToProductDetail(productId: number) {
      this.router.navigate(['/product', productId]);
    }
    

    addcart(){
      console.log("cart added");
      this.router.navigate(['/viewcart']);
    }
    
}


