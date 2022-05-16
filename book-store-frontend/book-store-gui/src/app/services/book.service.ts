import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Book} from "../common/book";
import {BookCategory} from "../common/book-category";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseURL = "http://localhost:8080/api/v1/books";
  categoryURL = "http://localhost:8080/api/v1/book-category";

  constructor(private httpClient:HttpClient) { }

  getBooks():Observable<Book[]>{
    return this.httpClient.get<GetResponseBooks>(this.baseURL).pipe(
      map(response=>response._embedded.books)
    );
  }

  getBooksById(id:number):Observable<Book[]>{
    return this.httpClient.get<GetResponseBooks>(`${this.baseURL}/search/categoryId?id=${id}`).pipe(
      map(response=>response._embedded.books)
    );
  }

  getBookCategories():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(`${this.categoryURL}`).pipe(
      map(response=>response._embedded.bookCategories)
    );
  }

}

interface GetResponseBooks{
  _embedded: {
    books : Book[];
  }
}

interface GetResponseBookCategory{
  _embedded: {
    bookCategories : BookCategory[];
  }
}
