import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (token) => {
        if (token !== 'Login Failed') {
          localStorage.setItem('jwt', token);
          localStorage.setItem('username', this.credentials.username);

          Swal.fire({
            title: 'Login Successful 🎉',
            text: `Welcome, ${this.credentials.username}!`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => this.router.navigate(['/home']), 2000);
        } else {
          Swal.fire({
            title: 'Invalid Credentials ❌',
            text: 'Please check your username and password.',
            icon: 'error'
          });
        }
      },
      error: () => {
        Swal.fire({
          title: 'Login Failed 😞',
          text: 'Please check your details and try again.',
          icon: 'error'
        });
      },
    });
  }
}
