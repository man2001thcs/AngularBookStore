import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './bookList_search.store.action';
import { State } from './bookList_search.store.reducer';

export const bookListFeatureState = createFeatureSelector<State>(storeKey);

export const getBookList = createSelector(
  bookListFeatureState,
  (state) => state.bookList
);

export const getMessage = createSelector(
  bookListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  bookListFeatureState,
  (state) => state.error
);
