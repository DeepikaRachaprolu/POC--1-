import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { errormessages } from '../../common/error-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signup',
   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule], 
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css'
})
export class AdminSignupComponent {
  emessage = errormessages;
  data : any;
signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });


  constructor(private router: Router){
    
  }
  login(){
    const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
    if(storedData.email != this.signin.get('email')?.value && storedData.password != this.signin.get('password')?.value)
  {
    this.signin.get('email')?.setErrors({ 'passwordMismatch': true });
    this.signin.get('password')?.setErrors({ 'passwordMismatch': true });
  } else{
    this.signin.get('email')?.setErrors(null);
    this.signin.get('password')?.setErrors(null);
    this.router.navigate(['/home'])
  }
  }
}
