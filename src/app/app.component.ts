import { Component, OnInit } from '@angular/core';
import { UuidService } from './services/uuid.service';
import { Competitor, CompetitorsService } from './services/competitors.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spooky-Voter';
  competitor1: Competitor;
  competitor2: Competitor;
  showCompetitors = false;
  chooseCategory = false;
  currentCategory: string;
  voting: boolean;

  constructor(private uuidService: UuidService,
    private competitorsService: CompetitorsService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    if (!this.uuidService.haveUuid()) {
      this.uuidService.setUuid();
    }
    this.categoryChoise();
  }

  categoryChoise() {
    this.chooseCategory = false;
    this.initCompetitors('male');
  }


  initCompetitors(category: string) {
    this.currentCategory = category;
    Promise.all([
      this.competitorsService.getNextCompetitor(this.currentCategory),
      this.competitorsService.getNextCompetitor(this.currentCategory)
    ]).then(
      (competitors: Competitor[]) => {
        this.competitor1 = competitors[0];
        this.competitor2 = competitors[1];
        this.chooseCategory = false;
        this.showCompetitors = true;
        this.voting = false;
      }
    );
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
    this.showCompetitors = false;
    this.chooseCategory = true;
  }
}
