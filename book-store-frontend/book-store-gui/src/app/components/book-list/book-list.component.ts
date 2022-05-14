import { Component, OnInit } from '@angular/core';
import {Book} from "../../common/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private bookService:BookService) { }

  books:Book[] = [];
  displayedColumns: string[] = ['sku', 'name', 'description', 'unitPrice', 'imageUrl'];

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks(){
    this.bookService.getBooks().subscribe(
      data=>{
        console.log(data);
        this.books=data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
