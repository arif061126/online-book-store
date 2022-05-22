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
  keyword:string;
  books:Book[] = [];
  pageOfItems: Array<Book>;
  //pageOfItems: number;
  p:number = 1;
  pageSize:number= 3;
  //total: number = 0;
  //page: number = 1;
  //count: number = 0;
  //title: string = '';
  pageSizes = [3, 6, 10];

  ngOnInit(): void {
    //this.getBooksPerPage();
    /*this.bookService.getBooks()
      .subscribe(response => {
        this.books = response;
      });*/


    this.route.paramMap.subscribe( // we can also use params instead paramMap
      ()=>{
        this.listBooksById();
      }
    )
  }

  pageChangeEvent(event:any){
    //update the current page of item:
    //this.pageOfItems = pageOfItems;
    this.p = event;
    //this.listBooks();
    this.retrieveBooks();
  }

  handlePageSizeChange(event: any){
    this.pageSize = event.target.value;
    //this.page = 1;
    //this.pageSize = pageSize;
    //this.listBooks();
    this.route.paramMap.subscribe( // we can also use params instead paramMap
      ()=>{
        this.retrieveBooks();
        //setTimeout(() => this.pageChangeEvent(event));
      }
    )
  }

  retrieveBooks(){
    this.bookService.getBooks().subscribe(
      data=>{
        data.length = this.pageSize;
        this.books=data;
        console.log(data);
        console.log(this.books.length);
      },
      error => {
        console.log(error);
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
    const searchMode:boolean = this.route.snapshot.paramMap.has('keyword');
    if(searchMode){
      this.handleSearchBook();
    }else{
      this.handleListBooks();
    }
  }

  handleListBooks(){
    //moved from listBooksById()
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //this.id = +this.route.snapshot.paramMap.get('id'); //converting to id
      this.id = this.route.snapshot.params['id'];
    }else {
      //this.handlePageSizeChange(event);
      //this.retrieveBooks();
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

  handleSearchBook(){
    this.keyword = this.route.snapshot.params['keyword'];
    this.bookService.searchBookByKeyword(this.keyword).subscribe(
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
