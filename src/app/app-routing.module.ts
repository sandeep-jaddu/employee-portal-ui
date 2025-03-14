import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { BooksComponent } from './components/books/books.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
  { path: 'books', component: BooksComponent},
  { path: '**', redirectTo: '/books', pathMatch: 'full'},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
