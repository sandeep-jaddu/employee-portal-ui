import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', password: '', emailId: '' };
  registrationSuccess = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        if (response.responseStatus) {
          Swal.fire({
            title: 'Registration Successful ✅',
            text: 'You will be redirected to the login page shortly!',
            icon: 'success',
            timer: 2500,
            showConfirmButton: false
          });

          this.registrationSuccess = true;
          setTimeout(() => this.router.navigate(['/']), 2500);
        } else {
          Swal.fire({
            title: 'Registration Failed ❌',
            text: response.message,
            icon: 'error'
          });
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Registration Error ❗',
          text: err.message,
          icon: 'error'
        });
      },
    });
  }
}
