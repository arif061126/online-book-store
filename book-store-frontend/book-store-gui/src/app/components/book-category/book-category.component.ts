import { Component, OnInit } from '@angular/core';
import {BookCategory} from "../../common/book-category";
import {BookService} from "../../services/book.service";
import {Book} from "../../common/book";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {

  id:number;
  books:Book[] = [];
  bookCategories:BookCategory[];

  constructor(private bookService:BookService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    //this.id = this.route.snapshot.params['id'];
    //this.listBooksById();
    this.listBookCategories();
  }

  listBookCategories(){
    this.bookService.getBookCategories().subscribe(
      data=>{
        this.bookCategories = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  /*listBooksById(){
    this.bookService.getBooksById(this.id).subscribe(
      data=>{
        console.log(data);
        this.books=data;
      },
      error => {
        console.log(error);
      }
    )
  }*/

}
