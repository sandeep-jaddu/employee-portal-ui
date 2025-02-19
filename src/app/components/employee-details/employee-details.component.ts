import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any = { addresses: [] };
  editing = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8881/employee-address/getEmployeeDetailsWithAddressById/${id}`)
      .subscribe({
        next: (data) => (this.employee = data),
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to load employee details.',
          });
        },
      });
  }

  toggleEdit() {
    if (!this.editing) {
      this.editing = true;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Unsaved changes will be lost!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, discard changes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.editing = false;
        }
      });
    }
  }

  updateEmployee() {
    this.http.put(`http://localhost:8881/employee/updateEmployee/${this.employee.id}`, this.employee)
      .subscribe({
        next: () => {
          this.editing = false;
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Employee details updated successfully.',
            showConfirmButton: false,
            timer: 2000,
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to update employee details.',
          });
        },
      });
  }

  goBack() {
    this.router.navigate(['/employees']); // Navigates to employees list
  }
}
