import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../common/book";
import {BookCategory} from "../common/book-category";
import {map} from "rxjs/internal/operators";

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

  getBooksByParams(id:number, currentPage:number, pageSize:number):Observable<GetResponseBooks>{
    return this.httpClient.get<GetResponseBooks>(`${this.baseURL}/search/categoryId?id=${id}&page=${currentPage}&size=${pageSize}`);
  }

  getBookCategories():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(`${this.categoryURL}`).pipe(
      map(response=>response._embedded.bookCategories)
    );
  }

  searchBookByKeyword(keyword:string):Observable<GetResponseBooks>{
    return this.httpClient.get<GetResponseBooks>(`${this.baseURL}/search/searchByKeyword?keyword=${keyword}`);
  }

  getBookDetails(bookId:number):Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseURL}/${bookId}`);
  }

  getPages(page: number){
    return this.httpClient.get(this.baseURL + '?page=' + page);
  }

  getAll(params: any): Observable<any> {
    return this.httpClient.get<any>(this.baseURL, { params });
  }

}

interface GetResponseBooks{
  _embedded: {
    books : Book[];
  },
  page : {
    //number of records in each page
    size: number,
    //total number of records in db
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages : number,
    //current page
    number : number
  }
}

interface GetResponseBookCategory{
  _embedded: {
    bookCategories : BookCategory[];
  }
}


