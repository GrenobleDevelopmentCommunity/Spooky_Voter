import { Component, OnInit, OnDestroy } from '@angular/core';
import { Competitor, CompetitorsService } from '../services/competitors.service';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute, NavigationEnd, ResolveEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit, OnDestroy {
  competitor1: Competitor;
  competitor2: Competitor;
  voting: boolean;
  currentCategory: string;
  backSubscription: any;

  constructor(private competitorsService: CompetitorsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.initCompetitors();
    this.backSubscription = this.router.events.subscribe(
      (event) => {
        if (event instanceof ResolveEnd) {
          console.log('>>>>>>>>>>><<<<<<<<<<<');
          this.competitorsService.backArrow(this.currentCategory);
        }
        // console.log(event);
      }
    );
  }

  ngOnDestroy() {
    this.backSubscription.unsubscribe();
  }

  initCompetitors() {
    // TODO: Check this somewhere else
    this.currentCategory = this.route.snapshot.paramMap.get('category');
    if (!(this.currentCategory === 'male' || this.currentCategory === 'female')) {
      this.router.navigate(['/category']);
    }
    this.competitor1 = this.competitorsService.getNextCompetitor(this.currentCategory);
    this.competitor2 = this.competitorsService.getNextCompetitor(this.currentCategory);
  }


  // TODO: Merge both vote methods
  voteUp() {
    if (!this.voting) {
      this.voting = !this.voting;
      if (this.competitorsService.hasNextCompetitor(this.currentCategory)) {
        this.competitor2 = this.competitorsService.getNextCompetitor(this.currentCategory);
        this.voting = !this.voting;
      } else {
        this.endVote(this.competitor1);
      }
    }
  }

  voteDown() {
    if (!this.voting) {
      this.voting = !this.voting;
      if (this.competitorsService.hasNextCompetitor(this.currentCategory)) {
        this.competitor1 = this.competitorsService.getNextCompetitor(this.currentCategory);
        this.voting = !this.voting;
      } else {
        this.endVote(this.competitor2);
      }
    }
  }

  endVote(winner: Competitor) {
    this.competitorsService.vote(winner);
    if (this.currentCategory === 'male') {
      this.categoryService.finishMaleVote();
    } else {
      this.categoryService.finishFemaleVote();
    }
    this.router.navigate(['/category']);
  }
}
