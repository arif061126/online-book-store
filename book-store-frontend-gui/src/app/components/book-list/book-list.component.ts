import { Component, OnInit } from '@angular/core';
import {Book} from "../../common/book";
import {BookService} from "../../services/book.service";
import {ActivatedRoute} from "@angular/router";
import {NgbPaginationConfig} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private bookService:BookService,
              private route:ActivatedRoute,
              private config: NgbPaginationConfig,
              private cartService: CartService) {
    config.maxSize = 3;
    config.boundaryLinks = true;
  }

  id:number = 1;
  keyword:string;
  books:Book[] = [];
  //pageOfItems: Array<Book>; //client side component
  //pageSize:number= 5; //client side component

  //new properties for server side paging
  searchMode:boolean = false;
  currentPage:number = 1;
  pageSize:number= 3;
  totalRecords:number = 0;

  previousCategory:number = 1;


  ngOnInit(): void {
    this.route.paramMap.subscribe( // we can also use params instead paramMap
      ()=>{
        this.listBooksById();
      }
    )
  }

  /**
   * for client side
   * @param pageOfItems

  pageClick(pageOfItems:Array<Book>){
    this.pageOfItems = pageOfItems;
  }*/



  updatePageSize(pageSize:number){
    //this.pageSize = pageSize; // for client side
    this.pageSize = pageSize;
    this.currentPage = 1;
    //this.listBooks();
    this.listBooksById();
  }

  listBooks(){
    this.bookService.getBooks().subscribe(
      data=>{
        console.log(data);
        this.books=data;
      }
    )
  }

  listBooksById(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      //do search book
      this.handleSearchBook();
    }else{
      //display books based on category
      this.handleListBooks();
    }
  }

  /*listBookBySize(){
    this.bookService.getAllBooks(this.pageSize).subscribe(
      data=>{
        console.log(data);
        this.books = data._embedded.books;
        this.pageSize = data.page.size;
      }
    )
  }*/

  handleListBooks(){
    //moved from listBooksById()
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //this.id = +this.route.snapshot.paramMap.get('id'); //converting to id
      this.id = this.route.snapshot.params['id'];
      /*this.bookService.getBooksById(this.id).subscribe(
        data=>{
          console.log(data);
          this.books=data;
        }
      )
    }else {
      this.listBooks();
    }*/

    }else {
      this.id = 1;
      //this.listBooks();
      //this.listBookBySize();
    }

    if(this.previousCategory!=this.id){
      this.currentPage = 1;
    }

    this.previousCategory = this.id;

    this.bookService.getBooksByParams(this.id, this.currentPage-1, this.pageSize)
      .subscribe(this.processPaginate());

  }

  handleSearchBook(){
    this.keyword = this.route.snapshot.params['keyword'];

    this.bookService.searchBookByKeyword(this.keyword,this.currentPage, this.pageSize)
      .subscribe(this.processPaginate());
  }

  processPaginate() {
    return data=>{
      console.log(data);
      this.books = data._embedded.books;
      //page number starts from 1 index in ng
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  addToCart(book: Book) {
    console.log(`${book.name}>>${book.unitPrice}`);

    const cartItems = new CartItem(book);

    this.cartService.addToCart(cartItems);

  }
}
