import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Book } from "./booklist.component.model";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { State as BookListState } from './booklist.store.reducer';
import { Store } from '@ngrx/store';
import * as BookListActions from './booklist.store.action';
import { bookList } from './booklist.store.selector';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css'],
})
export class BooklistComponent implements OnInit, AfterViewInit {
  book_list!: Book[];
  books_length = 0;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'page_number',
    'type',
  ];
  clickedRows = new Set<any>();

  @ViewChild(MatPaginator) paraginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getBookList: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<BookListState>
  ) {
    this.getBookList = this.store.select(bookList);
  }

  ngOnInit(): void {
    let page_number = 1;
    let page_offset = 10;

    this.subscriptions.push(
      this.getBookList.subscribe((state) => {
        if (state) {
          this.book_list = state.data;
          console.log(state.data);
        }
      })
    );

    this.store.dispatch(
      BookListActions.initial());

    this.store.dispatch(
      BookListActions.getBooklist({
        payload: {
          page_number,
          page_offset,
        },
      })
    );

    console.log("abc");
  }

  ngAfterViewInit(): void {
    //this.book_list.paginator = this.paraginator;

    // this.paraginator.page
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       return this.guestService.getBookList(
    //         this.paraginator.pageIndex + 1,
    //         10
    //       );
    //     }),
    //     map((data) => {
    //       // Flip flag to show that loading has finished.
    //       console.log(data);
    //       if (data === null) {
    //         return [];
    //       }

    //       // Only refresh the result length if there is new data. In case of rate
    //       // limit errors, we do not want to reset the paginator to zero, as that
    //       // would prevent users from re-triggering requests.
    //       //this.da = data.total_count;
    //       return JSON.parse(data.data);
    //     })
    //   )
    //   .subscribe((data) => (this.book_list = data));
  }

  rowClicked(id: string): void {
    this.router.navigate(['/guest/' + id + '/detail']);
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log(sortState);
    if (sortState.direction === 'asc') {
      this.book_list?.sort((a: any, b: any) => {
        if (a.WpBook[sortState.active] < b.WpBook[sortState.active]) {
          return -1;
        } else if (a.WpBook[sortState.active] > b.WpBook[sortState.active]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortState.direction === 'desc') {
      this.book_list?.sort((a: any, b: any) => {
        if (a.WpBook[sortState.active] > b.WpBook[sortState.active]) {
          return -1;
        } else if (a.WpBook[sortState.active] < b.WpBook[sortState.active]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
    }
  }
}
