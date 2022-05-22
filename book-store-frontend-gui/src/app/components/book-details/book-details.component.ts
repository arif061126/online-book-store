import { Component, OnInit } from '@angular/core';
import {Book} from "../../common/book";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book:Book=new Book();
  bookId:number;

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ()=>{
        this.getBookInfo();
      }
    )
  }

  getBookInfo(){
    this.bookId= this.activatedRoute.snapshot.params['id'];
    this.bookService.getBookDetails(this.bookId).subscribe(
      data=>{
        //console.log(data);
        this.book = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  addToCart(book: Book) {
    console.log(`${book.name}>>${book.unitPrice}`);

    const cartItems = new CartItem(book);

    this.cartService.addToCart(cartItems);

  }
}
