import { Component, OnInit } from '@angular/core';
import {Book} from "../../common/book";
import {BookService} from "../../services/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private bookService:BookService, private route:ActivatedRoute) { }

  id:number;
  books:Book[] = [];
  //displayedColumns: string[] = ['sku', 'name', 'description', 'unitPrice', 'imageUrl'];

  ngOnInit(): void {
    this.route.paramMap.subscribe( // we can also use params instead paramMap
      ()=>{
        this.listBooksById();
      }
    )
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

  listBooksById(){
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //this.id = +this.route.snapshot.paramMap.get('id'); //converting to id
      this.id = this.route.snapshot.params['id'];
    }else {
      //this.id = 1;
      this.listBooks();
    }
    this.bookService.getBooksById(this.id).subscribe(
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
