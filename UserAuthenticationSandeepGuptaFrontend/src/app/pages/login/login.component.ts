import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router,private toastr : ToastrService) { }

  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          // Handle successful signup
          console.log('Signup successful:', response);
          this.toastr.success('Login SuccessFull','Success');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          // Handle error during signup
          console.error('Login error:', err);
          this.toastr.error('Invalid Email or Password','Error');
        }
      });
    }
  }
}