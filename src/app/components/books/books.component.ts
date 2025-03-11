import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

interface Book {
  id?: number;
  name: string;
  author: string;
  description: string;
  numberOfPages: number;
  price: number;
  bookCreatedBy: number;
  isDeleted: boolean;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  isEditMode = false;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  // Fetch all books
  getAllBooks(): void {
    this.booksService.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }

  // Open Add Book Modal
  openAddModal(): void {
    this.isEditMode = false;
    this.selectedBook = {
      name: '',
      author: '',
      description: '',
      numberOfPages: 0,
      price: 0,
      bookCreatedBy: 1,
      isDeleted: false,
    };
    Swal.fire({
      title: 'Add New Book',
      html: this.getBookForm(),
      showCancelButton: true,
      confirmButtonText: 'Add Book',
      preConfirm: () => this.getFormValues(),
    }).then((result) => {
      if (result.isConfirmed && this.selectedBook) {
        this.booksService.addBook(this.selectedBook).subscribe(() => {
          Swal.fire('Added!', 'Book has been added.', 'success');
          this.getAllBooks();
        });
      }
    });
  }

  // Open Update Book Modal
  openEditModal(book: Book): void {
    this.isEditMode = true;
    this.selectedBook = { ...book };
    Swal.fire({
      title: 'Edit Book',
      html: this.getBookForm(this.selectedBook),
      showCancelButton: true,
      confirmButtonText: 'Update Book',
      preConfirm: () => this.getFormValues(),
    }).then((result) => {
      if (result.isConfirmed && this.selectedBook) {
        this.booksService.updateBook(this.selectedBook.id!, this.selectedBook).subscribe(() => {
          Swal.fire('Updated!', 'Book has been updated.', 'success');
          this.getAllBooks();
        });
      }
    });
  }

  // Delete Book Confirmation
  deleteBook(book: Book): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This book will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.booksService.deleteBook(book.id!).subscribe(() => {
          Swal.fire('Deleted!', 'The book has been removed.', 'success');
          this.getAllBooks();
        });
      }
    });
  }

  // Helper Functions
  getBookForm(book: Book | null = null): string {
    return `
      <input id="name" class="swal2-input" placeholder="Book Name" value="${book?.name || ''}">
      <input id="author" class="swal2-input" placeholder="Author" value="${book?.author || ''}">
      <input id="description" class="swal2-input" placeholder="Description" value="${book?.description || ''}">
      <input id="numberOfPages" type="number" class="swal2-input" placeholder="Pages" value="${book?.numberOfPages || 0}">
      <input id="price" type="number" class="swal2-input" placeholder="Price" value="${book?.price || 0}">
    `;
  }

  getFormValues(): void {
    if (this.selectedBook) {
      this.selectedBook.name = (document.getElementById('name') as HTMLInputElement).value;
      this.selectedBook.author = (document.getElementById('author') as HTMLInputElement).value;
      this.selectedBook.description = (document.getElementById('description') as HTMLInputElement).value;
      this.selectedBook.numberOfPages = Number((document.getElementById('numberOfPages') as HTMLInputElement).value);
      this.selectedBook.price = Number((document.getElementById('price') as HTMLInputElement).value);
    }
  }
}
