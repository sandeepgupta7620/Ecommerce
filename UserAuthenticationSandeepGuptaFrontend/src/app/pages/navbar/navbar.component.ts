import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartUpdateComponent } from '../cart-update/cart-update.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,CommonModule,CartUpdateComponent,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router, private toatsr : ToastrService) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('UserID');
  }

  

  logout():void{
    this.toatsr.success("Logged Out, Successfully!")
    localStorage.removeItem('UserID');
    localStorage.removeItem('Username');
    localStorage.removeItem('token');
    this.router.navigate(['/signup']);
  }
}
