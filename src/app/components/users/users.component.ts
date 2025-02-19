import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  username: string;
  emailId: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  currentPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  // Fetch users from the backend
  fetchUsers() {
    this.http.get<User[]>('http://localhost:8881/user/getAllUsers').subscribe({
      next: (data) => {
        this.users = data.filter((user) => user.username);
        this.filteredUsers = [...this.users];
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
      },
    });
  }

  // Filter users based on search text
  filterUsers() {
    const search = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(search) ||
        user.emailId.toLowerCase().includes(search)
    );
    this.currentPage = 1;
  }

  // Export to Excel using backend API
  exportToExcel(): void {
    const apiUrl = 'http://localhost:8881/user/exportUsersToExcel';

    this.http.get(apiUrl, { responseType: 'blob' }).subscribe({
      next: (response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = 'Registered_Users.xlsx';

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        console.log('Excel file downloaded successfully.');
      },
      error: (err) => {
        console.error('Failed to export users to Excel', err);
      }
    });
  }
}
