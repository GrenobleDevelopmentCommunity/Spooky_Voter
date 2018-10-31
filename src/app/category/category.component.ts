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
  emiting = false;

  @Output() categoryChoice = new EventEmitter<string>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.disableFemaleButton = this.categoryService.isFemaleVoteFinished();
    this.disableMaleButton = this.categoryService.isMaleVoteFinished();

    // TODO: if both true show end message
  }

  initMaleVote(event: Event) {
    if (!this.emiting) {
      console.log('initMaleVote');
      this.categoryChoice.emit('male');
    }
  }

  initFemaleVote(event: Event) {
    if (!this.emiting) {
      console.log('initFemaleVote');
      this.categoryChoice.emit('female');
    }
  }

}
