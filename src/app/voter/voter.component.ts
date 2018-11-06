import { Component, OnInit, OnDestroy } from '@angular/core';
import { Competitor, CompetitorsService } from '../services/competitors.service';
import { CategoryService } from '../services/category.service';

import { Location } from '@angular/common';
import { Router, ActivatedRoute, ResolveEnd } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css'],
  animations: [
    trigger('avatarChangeF', [
      transition(':enter, * => 0', []),
      transition(':increment', [
        animate('1s', style({ opacity: 0 }))
      ])
    ]),
    trigger('avatarChangeS', [
      transition(':enter, * => 0', []),
      transition(':increment', [
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class VoterComponent implements OnInit, OnDestroy {
  competitor1: Competitor;
  competitor2: Competitor;
  competitorF = 0;
  competitorS = 0;
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
          let itemName: string;
          if (this.currentCategory === 'male') {
            itemName = 'm';
          } else {
            itemName = 'f';
          }
          localStorage.setItem('c1' + itemName, JSON.stringify(this.competitor1));
          localStorage.setItem('c2' + itemName, JSON.stringify(this.competitor2));
        }
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
    // TODO why pass 2 times ?
    this.competitor1 = { uid: '', picture_link: 'http://www.quickmeme.com/img/8e/8ecae9bfdbba971f324d27a30688def1566bf088751bcc814ebc5a7f0d4d3bcc.jpg', nickname: '👻 Loading 👻' };
    this.competitor2 = { uid: '', picture_link: 'http://www.quickmeme.com/img/8e/8ecae9bfdbba971f324d27a30688def1566bf088751bcc814ebc5a7f0d4d3bcc.jpg', nickname: '👻 Loading 👻' };
  }


  // TODO: Merge both vote methods
  voteUp() {
    this.competitorS = this.competitorS + 1;
  }

  getNextUp(event) {
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
    this.competitorF = this.competitorF + 1;
  }

  getNextBottom(event) {
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
    if (this.currentCategory === 'male' && !localStorage.getItem('male')) {
      this.competitorsService.vote(winner);
      this.categoryService.finishMaleVote();
    } else if (this.currentCategory === 'female' && !localStorage.getItem('female')) {
      this.competitorsService.vote(winner);
      this.categoryService.finishFemaleVote();
    }
    this.router.navigate(['/category']);
  }
}
