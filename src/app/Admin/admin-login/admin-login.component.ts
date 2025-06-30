import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  
import { MatInputModule } from '@angular/material/input';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { errormessages } from '../../common/error-messages';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthService'; 

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule], 
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [AuthService]
})
export class AdminLoginComponent {
  emessage = errormessages;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('testuser', [Validators.required]), // Remove Validators.email if not using real emails
    password: new FormControl('testpass', Validators.required),
  });

  constructor(private router: Router, private authService: AuthService) {}

  loginClicked() {
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (this.authService.login(username, password)) {
      this.router.navigate(['/products']);
    } else {
      alert('Invalid username or password');
    }
  }
}
