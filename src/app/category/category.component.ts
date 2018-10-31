import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  disableMaleButton: boolean;
  disableFemaleButton: boolean;
  @Output() categoryChoice = new EventEmitter<string>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.disableFemaleButton = this.categoryService.isFemaleVoteFinished();
    this.disableMaleButton = this.categoryService.isMaleVoteFinished();
  }

  initMaleVote(event: Event) {
    console.log('initMaleVote');
    this.categoryChoice.emit('male');
  }

  initFemaleVote(event: Event) {
    console.log('initFemaleVote');
    this.categoryChoice.emit('female');
  }

}
