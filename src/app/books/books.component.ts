import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, NgControl } from '@angular/forms';
import * as moment from 'moment';
import { Ibook } from '../interface/ibook';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Ibook[];
  panelOpenState = false;
  isEdite = false;
  selctedBook: Ibook;
  profileForm: FormGroup
  selectedRow: any;
  isshow = false;
  mySelected: Ibook;
  isSaved = false;
  isError = false;




  patternForString = "[a-zA-Z][a-zA-Z ]+";
  date_regex = "^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$";

  constructor(private service: HttpService, private fb: FormBuilder) {
    service.getAllBooks().subscribe(x => {
      this.books = x;
      this.books.forEach(element => {
        this.creteForm(element);
      })
    });
  }

  deleteBook(event) {
    for (var i = this.books.length - 1; i >= 0; i--) {
      if (this.books[i].title === event.title) {
        this.books.splice(i, 1);
      }
    }
    this.isSaved = true;
    this.isError = false;
  }
  saveBook(event) {
    this.mySelected = event;
    this.books.forEach(element => {
      element.author = event.author;
      element.Published = event.published;


    });
    this.isSaved = true;
    this.isError = false;

  }
  addBook(event) {
    var found = this.books.find(function (element) {
      if (element.title == event.title) return true
    });
    if (!found) {
      this.books.push(event);
      this.isSaved = true;
      this.isError = false;

    } else {
      this.isSaved = false;
      this.isError = true;

    }

  }
  editBook(ngForm: NgForm, book) {
    this.isEdite = !this.isEdite;
    ngForm.value['pic'] = book.pic;
    ngForm.value['title'] = book.title;
    this.service.setselectedBook(ngForm.value);
    this.creteForm(book);
    this.isshow = true;

  }


  delete(book: Ibook) {
    this.service.setselectedBook(book);
  }
  setClickedRow = function (index) {
    this.selectedRow = index;
  }

  creteForm(element) {
    element.Published = moment(new Date(element.Published)).format('MM/DD/YYYY');
    this.profileForm = this.fb.group({
      author: [element.author, Validators.pattern(this.patternForString)],
      published: [element.Published, Validators.pattern(this.date_regex)],
      pic: [element.pic],
      title: [element.title],
      id: [element.id]
    });



  }
  onEdite(book) {
    this.isEdite = false;
  }

  ngOnInit() {

  }

}


