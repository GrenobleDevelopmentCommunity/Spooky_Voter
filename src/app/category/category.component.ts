import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  disableMaleButton: boolean;
  disableFemaleButton: boolean;
  emiting = false;

  constructor(private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit() {
    this.disableFemaleButton = this.categoryService.isFemaleVoteFinished();
    this.disableMaleButton = this.categoryService.isMaleVoteFinished();
  }

  initMaleVote(event: Event) {
    if (!this.emiting) {
      console.log('initMaleVote');
      this.router.navigate(['/votes/male']);
      // this.categoryChoice.emit('male');
    }
  }

  initFemaleVote(event: Event) {
    if (!this.emiting) {
      this.router.navigate(['/votes/female']);
      // this.categoryChoice.emit('female');
    }
  }

  allVotesDone(): boolean {
    const res = this.disableFemaleButton && this.disableMaleButton;
    if (res) {
      localStorage.removeItem('c1m');
      localStorage.removeItem('c2m');
      localStorage.removeItem('c1f');
      localStorage.removeItem('c2f');
    }
    return res;
  }

}
