import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem [] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cItems:CartItem){
    //check whether the book item is already in the cart or not
    let alreadyPresentInTheCart:boolean = false;
    let existedCartItem: CartItem = undefined;

    console.log(this.cartItems);

    if(this.cartItems.length > 0){
      //find the book by id in the cart
      existedCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cItems.id);
      alreadyPresentInTheCart = (existedCartItem != undefined);
    }

    if(alreadyPresentInTheCart){
      //increase the quantity
      existedCartItem.quantity++;
      //console.log(existedCartItem.quantity);
      //console.log(cItems.quantity);

    }else {
      //add to the cart items array
      this.cartItems.push(cItems);
      //console.log(cItems.quantity);
    }

    //calculate total price:
    this.calculateTotalPrice();
  }

  removeFromCart(cItems:CartItem){
    //decrease the quantity
    cItems.quantity--;
    if(cItems.quantity===0){
      this.removeItem(cItems);
    }else {
      this.calculateTotalPrice();
    }
  }

  removeItem(cItems:CartItem){
    const itemIndex = this.cartItems.findIndex(
     (tempItem)=>tempItem.id===cItems.id
    )

    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    let totalPriceValue:number = 0.0;
    let totalQuantityValue:number = 0;

    //calculate total price:
    for(let currentCartItem of this.cartItems){
      //console.log(currentCartItem.quantity);
      //console.log(currentCartItem.unitPrice);

      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    console.log(totalPriceValue);
    console.log(totalQuantityValue);

    //publishing the events of total price and value:
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
