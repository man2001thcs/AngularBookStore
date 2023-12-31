import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { GuestRouterModule } from "./guest.router";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { StoreModule } from "@ngrx/store";

import { MainComponent } from "./../main/main.component";
import { HeaderComponent } from "../header/header.component";
import { BookDetailComponent } from "../book-detail/book-detail.component";
import { BooklistComponent } from "../booklist/booklist.component";
import { LoginComponent } from "../log/login/login.component";

import { BookListEffects } from "../booklist/booklist.store.effect";
import { LoginEffects } from "../log/login/login.store.effect";

import { EffectsModule } from "@ngrx/effects";

import { storeKey as LoginStoreKey } from "../log/login/login.store.action";
import { storeKey as BookListStoreKey } from "../booklist/booklist.store.action";
import { storeKey as BookListSaleStoreKey } from "../home/book-sale/bookList_sale.store.action";
import { storeKey as BookListCategoryStoreKey } from "../home/book-category/bookList_category.store.action";
import { storeKey as BookDetailStoreKey } from "../book-detail/book-detail.store.action";

import { reducer as BookListReducer } from "../booklist/booklist.store.reducer";
import { reducer as BookListSaleReducer } from "../home/book-sale/bookList_sale.store.reducer";
import { reducer as BookListCategoryReducer } from "../home/book-category/bookList_category.store.reducer";
import { reducer as BookDetailReducer } from "../book-detail/book-detail.store.reducer";
import { reducer as LoginReducer } from "../log/login/login.store.reducer";

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbThemeModule,
} from "@nebular/theme";

import { BookListSaleComponent } from "../home/book-sale/bookList_sale.component";
import { NgbModule, NgbPaginationModule, NgbProgressbar, NgbProgressbarModule } from "@ng-bootstrap/ng-bootstrap";
import { BookCardComponent } from "src/app/utility/book-card/book-card.component";
import { HomeComponent } from "../home/home.component";
import { BookListSaleEffects } from "../home/book-sale/bookList_sale.store.effect";
import { BookListCategoryEffects } from "../home/book-category/bookList_category.store.effect";
import { BookListCategoryComponent } from "../home/book-category/bookList_category.component";
import { BookDetailEffects } from "../book-detail/book-detail.store.effect";
import { nl2brPipe } from "src/app/utility/nl2br.pipe";
import { BookListSearchComponent } from "../search/book-category/bookList_search.component";
import { SearchComponent } from "../search/search.component";
import { SharedModule } from "src/app/shared.module";

@NgModule({
  declarations: [
    HomeComponent,

    MainComponent,
    BooklistComponent,
    BookDetailComponent,
    LoginComponent,
    HeaderComponent,
    BookListCategoryComponent,
    nl2brPipe,
    BookListSearchComponent,
    SearchComponent,
    BookListSaleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,

    NgbModule,
    NbThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NgbPaginationModule,

    GuestRouterModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonModule,

    MatDialogModule,


    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,

    StoreModule.forFeature(LoginStoreKey, LoginReducer),
    StoreModule.forFeature(BookListStoreKey, BookListReducer),
    StoreModule.forFeature(BookListStoreKey, BookListReducer),
    StoreModule.forFeature(BookListSaleStoreKey, BookListSaleReducer),
    StoreModule.forFeature(BookListCategoryStoreKey, BookListCategoryReducer),

    StoreModule.forFeature(BookDetailStoreKey, BookDetailReducer),



    EffectsModule.forFeature([BookListEffects]),
    EffectsModule.forFeature([BookDetailEffects]),
    EffectsModule.forFeature([BookListSaleEffects]),
    EffectsModule.forFeature([BookListCategoryEffects]),
    EffectsModule.forFeature([LoginEffects]),
  ],
  exports: [RouterModule],
})
export class GuestModule {
  static forRoot () {
    return {
      NgModule: GuestModule,
      providers: []
    }
  }
}
