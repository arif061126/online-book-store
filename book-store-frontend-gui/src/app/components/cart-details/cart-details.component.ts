import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  totalPrice:number = 0.0;
  totalQuantity:number = 0;

  cartItems: CartItem [] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartDetails();
  }

  cartDetails(){
    this.cartItems = this.cartService.cartItems;
    //console.log(this.cartService.cartItems);

    this.cartService.totalPrice.subscribe(
      data=>{
        this.totalPrice=data;
        //console.log(data);
      }
    );

    this.cartService.totalQuantity.subscribe(
      data=>{
        this.totalQuantity=data;
        //console.log(data);
      }
    );

    this.cartService.calculateTotalPrice();
    //console.log(this.cartService.calculateTotalPrice());

  }

  increaseQuantity(cartItems: CartItem) {
    //console.log("increase quantity", cartItems)
    this.cartService.addToCart(cartItems);
  }

  decreaseQuantity(cartItems: CartItem) {
    console.log("decrease quantity", cartItems);
    this.cartService.removeFromCart(cartItems);
  }

  removeCartItem(cartItems: CartItem) {
    this.cartService.removeItem(cartItems);
  }
}
