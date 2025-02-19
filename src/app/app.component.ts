import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isEmployeeDetailsPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide navbar only when on employee-details page
        this.isEmployeeDetailsPage = event.url.includes('/employee-details/');
      }
    });
  }

  showNavbar(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return !hiddenRoutes.includes(this.router.url) && !this.isEmployeeDetailsPage;
  }
}
