import { UserService } from '../../utility/user_service/user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, map } from 'rxjs';
import { Book } from 'src/app/model/book';
import { Response } from 'src/app/model/response';
import { HashService } from '../../utility/user_service/hash.service';
@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private password_key = "user_get";
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private hash: HashService
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(JSON.stringify(error)); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //email: 'dochu8@gmail.com',
  //fullname: 'Do Chu',
  //codeS: "ppfrfqlw",

  getBookList(page_number: number, page_offset: number): Observable<Response> {
    const url = '/api/controller/book/list_guest.php';
    let password_key = 'guest_get';
    //codeS: 'dochu8@gmail.com-2023-03-27 12:21:49-497';
    //emailS: 'dochu8@gmail.com';
    const post_body = {
      page_offset: page_offset,
    };
    let post_body_en = this.hash.encrypted_string(post_body, password_key);
    console.log(post_body);
    return this.http.post<Response>(url, post_body_en, this.httpOptions).pipe(
      catchError(this.handleError<Response>('Fetch books'))
    );
  }

  getBook(id: string): Observable<Book> {
    const url = '/api/controller/book/find_book_user.php';
    let post_body = {
      book_id: id,
    };
    let password_key = 'admin_get';
    let post_body_en = this.hash.encrypted_string(post_body, password_key);
    //console.log(post_body);
    return this.http.post<Response>(url, post_body_en, this.httpOptions).pipe(
      map((book) => {
        console.log('abc');
        console.log(book.data);
        return JSON.parse(book.data);
      }),
      catchError(this.handleError<Book>('Fetch book'))
    );
  }

  getAuthors(authors_id: string): Observable<Response> {
    let post_body = {
      authors_id: authors_id,
    };
    let url_author = '/api/controller/author/list_admin.php';
    let post_body_encrypted = this.hash.encrypted_string(
      post_body,
      this.password_key
    );
    //console.log(post_body);
    return this.http
      .post<Response>(url_author, post_body_encrypted, this.httpOptions)
      .pipe(
        map((author_list) => {
          //console.log('abc');
          console.log(author_list);
          return author_list;
        }),
        catchError(this.handleError<Response>('Fetch author'))
      );
  }

  getVouchers(vouchers_id: string): Observable<Response> {
    let post_body = {
      vouchers_id: vouchers_id,
    };
    let url_voucher = '/api/controller/voucher/list_admin.php';
    let post_body_encrypted = this.hash.encrypted_string(
      post_body,
      this.password_key
    );
    //console.log(post_body);
    return this.http
      .post<Response>(url_voucher, post_body_encrypted, this.httpOptions)
      .pipe(
        map((voucher_list) => {
          //console.log('abc');
          console.log(voucher_list);
          return voucher_list;
        }),
        catchError(this.handleError<Response>('Fetch voucher'))
      );
  }
}
