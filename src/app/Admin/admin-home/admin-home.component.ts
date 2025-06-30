import { Component, importProvidersFrom } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectDetectionService } from '../../services/object-detection.service';
import { errormessages } from '../../common/error-messages';
import { ProductDataService } from '../../services/product-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  detections: any[] = [];
  selectedFile: File | undefined;
  image: HTMLImageElement | undefined;
  pname : String  ="";
  emessage = errormessages;
  images : any[] =[];
  data: any;

  constructor(private objectDetectionService: ObjectDetectionService, private router: Router, private productDateService : ProductDataService) { }


  ngOnInit(){
   this.data = this.productDateService.getProductData();
   if (this.data) {
    this.productupload.patchValue({
      category: this.data.category,
      ProductName: this.data.productName,
      description: this.data.description,
      quantity: this.data.quantity,
      offerprice: this.data.offerprice,
      price: this.data.price,
    });
  }
  }

  productupload: FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    ProductName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    fileupload: new FormControl(null, Validators.required),
    quantity: new FormControl(0, Validators.required),
    offerprice: new FormControl(0, Validators.required),
    price: new FormControl(0, Validators.required),
  });


  onFilesSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
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
            console.log("directions",detections);
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
  uploadClicked(){
  const productcategory =  this.productupload.get('category')?.value;
  if(productcategory == "one"){
     this.pname = "Fashion";
  }
  if(productcategory == "two"){
     this.pname = "Beauty";
  }
  if(productcategory == "three"){
     this.pname ="Pharma";
  }
  }

  previewClicked() {
    const imageDataUrl = this.image ? this.image.src : ''; 
    this.router.navigate(['/preview'], {
      state: { 
        category: this.productupload.get('category')?.value,
        productName: this.productupload.get('ProductName')?.value,
        description: this.productupload.get('description')?.value,
        image: imageDataUrl,
        quantity: this.productupload.get('quantity')?.value,
        offerprice: this.productupload.get('offerprice')?.value,
        price: this.productupload.get('price')?.value,
      }
    });
  }
  

  backPage(){
    this.router.navigate(['/products']);
  }
}
