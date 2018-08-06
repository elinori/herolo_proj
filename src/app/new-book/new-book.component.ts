import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { Ibook } from '../interface/ibook';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  profileForm: FormGroup
  pattern = "[a-zA-Z][a-zA-Z ]+";
  date_regex = "^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$";

  constructor(private service: HttpService, private fb: FormBuilder) { this.createForm() }
  @Output()
  add: EventEmitter<Ibook> = new EventEmitter<Ibook>()

  createForm() {

    this.profileForm = this.fb.group({
      author: ['eli', Validators.pattern(this.pattern)],
      Published: ['01/07/2000', Validators.pattern(this.date_regex)],
      pic: ["assets/img/somebook.png", Validators.required],
      title: ['eli', Validators.pattern(this.pattern)]
    });
  }

  addBook(ngform: NgForm) {
    this.add.emit(ngform.value)
  }
  ngOnInit() {
  }

}
