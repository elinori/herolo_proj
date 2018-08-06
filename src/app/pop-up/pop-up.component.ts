import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ibook } from '../interface/ibook';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  selected: Ibook;
  isadded = false;
  @Output()
  deleteBook: EventEmitter<Ibook> = new EventEmitter<Ibook>()
  @Output()

  newBook: EventEmitter<Ibook> = new EventEmitter<Ibook>()
  @Output()

  savebook: EventEmitter<Ibook> = new EventEmitter<Ibook>()

  constructor(private service: HttpService) {
    this.selected = service.getSelectedBook();

  }

  save(selected: Ibook) {

    this.savebook.emit(selected);
  }
  delete(selected: Ibook) {
    this.deleteBook.emit(selected);
  }
  addBook() {
    this.isadded = true;


  }
  addbook(event) {

    this.newBook.emit(event);

  }


  ngOnInit() {
  }

}
