import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  disableMaleButton: boolean;
  disableFemaleButton: boolean;
  emiting = false;
  voteOpened = false;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(environment.apiUrl + '/clients/vote').subscribe(
      (data) => {
        const startingDate = new Date(data['body']);
        this.voteOpened = (startingDate < new Date());
      }
    );
    this.disableFemaleButton = this.categoryService.isFemaleVoteFinished();
    this.disableMaleButton = this.categoryService.isMaleVoteFinished();
  }

  initMaleVote(event: Event) {
    if (!this.emiting) {
      // console.log('initMaleVote');
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
