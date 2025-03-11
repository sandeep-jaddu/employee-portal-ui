import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8881/books';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get(`${API_URL}/getAllBooks`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(`${API_URL}/addBook`, book);
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put(`${API_URL}/updateBookById/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deleteBookById/${id}`);
  }
}
