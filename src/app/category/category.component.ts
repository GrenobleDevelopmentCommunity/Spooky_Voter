import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Output() categoryChoice = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  initMaleVote(event: Event) {
    event.srcElement.setAttribute('disabled', 'true');
    console.log('initMaleVote');
    this.categoryChoice.emit('male');
  }

  initFemaleVote(event: Event) {
    event.srcElement.setAttribute('disabled', 'true');
    console.log('initFemaleVote');
    this.categoryChoice.emit('female');
  }

}
