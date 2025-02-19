import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Employee {
  id: number;
  name: string;
  age: number;
  phone: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText: string = '';
  currentPage = 1;
  showAddModal = false;
  newEmployee: Partial<Employee> = { name: '', age: 0, phone: '' };

  constructor(private http: HttpClient) {}
 
  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.http.get<Employee[]>('http://localhost:8881/employee/getAllEmployees').subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees];
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load employees.',
        });
      },
    });
  }
  

  filterEmployees() {
    const search = this.searchText.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(search) ||
      emp.phone.includes(search)
    );
    this.currentPage = 1;
  }

  openAddEmployeeModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addEmployee() {
    const apiUrl = 'http://localhost:8881/employee/saveEmployee';
    this.http.post<Employee>(apiUrl, this.newEmployee).subscribe({
      next: () => {
        this.fetchEmployees();
        Swal.fire({
          icon: 'success',
          title: 'Employee Added!',
          text: 'Employee has been successfully added.',
          showConfirmButton: false,
          timer: 2000,
        });
        this.closeAddModal();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to add employee.',
        });
      },
    });
  }
  

  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8881/employee/deleteEmployee/${id}`).subscribe({
          next: () => {
            this.fetchEmployees();
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Employee has been deleted.',
              showConfirmButton: false,
              timer: 2000,
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to delete employee.',
            });
          },
        });
      }
    });
  }
  

  viewDetails(employeeId: number) {
    window.location.href = `/employee-details/${employeeId}`;
  }

  // Export to Excel using backend API
  exportToExcel(): void {
    const apiUrl = 'http://localhost:8881/employee-address/exportEmployeesToExcel';

    this.http.get(apiUrl, { responseType: 'blob' }).subscribe({
      next: (response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = 'Employee_Info.xlsx';

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        console.log('Excel file downloaded successfully.');
      },
      error: (err) => {
        console.error('Failed to export employees to Excel', err);
      }
    });
  }
}
