import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Ibook } from '../interface/ibook';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  selectedBook: Ibook;
  save: Ibook;
  constructor(private http: Http) { }

  getAllBooks(): Observable<Ibook[]> {
    return this.http.get('./assets/books.json').pipe(
      map(x => x.json())

    )
  }
  setselectedBook(book: Ibook) {
    this.selectedBook = book;
  }

  getSelectedBook() {
    return this.selectedBook;
  }

  savebook(book: Ibook) {
    this.save = book;
  }

}
