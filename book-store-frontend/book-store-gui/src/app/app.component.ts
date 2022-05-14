import { Component } from '@angular/core';
import {Book} from "./common/book";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store-gui';

  books:Book[] = [
    {
      sku : "text-100",
      name : "C Programming Language",
      description : "Learn C Programming Language",
      unitPrice : 600.00,
      imageUrl : "assets/images/books/text-100.png",
      active : true,
      unitsInStock : 100,
      createdOn : new Date(),
      updatedOn : new Date()
    },
    {
      sku : "text-101",
      name : "C# Crash Course",
      description : "Learn C# Programming Language",
      unitPrice : 900.00,
      imageUrl : "assets/images/books/text-101.png",
      active : true,
      unitsInStock : 100,
      createdOn : new Date(),
      updatedOn : new Date()
    },
    {
        sku : "text-102",
        name : "C++ Crash Course",
        description : "Learn C++ Programming Language",
        unitPrice : 700.00,
        imageUrl : "assets/images/books/text-102.png",
        active : true,
        unitsInStock : 100,
        createdOn : new Date(),
        updatedOn : new Date()
    },
    {
        sku : "text-103",
        name : "Cracking The Coding Interview",
        description : "Learn Cracking the coding interview",
        unitPrice : 1000.00,
        imageUrl : "assets/images/books/text-103.png",
        active : true,
        unitsInStock : 100,
        createdOn : new Date(),
        updatedOn : new Date()
    }
    ];
  displayedColumns: string[] = ['sku', 'name', 'description', 'unitPrice'];

}
