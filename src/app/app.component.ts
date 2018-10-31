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
    this.chooseCategory = true;
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
      }
    );
  }


  // TODO: Merge both vote methods
  voteUp() {
    this.competitorsService.vote(this.competitor1); // TODO: Rendre cet appel async
    if (this.competitorsService.hasNextCompetitor(this.currentCategory)) { // TODO: Rendre cet appel async
      // this.competitor2 = this.competitorsService.getNextCompetitor();
      this.competitorsService.getNextCompetitor(this.currentCategory).then(
        (comp: Competitor) => this.competitor2 = comp
      );
    } else {
      this.endVote();
    }
    // TODO: Add finishing state or return to men/women choice
  }

  voteDown() {
    this.competitorsService.vote(this.competitor2); // TODO: Rendre cet appel async
    if (this.competitorsService.hasNextCompetitor(this.currentCategory)) { // TODO: Rendre cet appel async
      // this.competitor1 = this.competitorsService.getNextCompetitor();
      this.competitorsService.getNextCompetitor(this.currentCategory).then(
        (comp: Competitor) => this.competitor1 = comp
      );
    } else {
      this.endVote();
    }
    // TODO: Add finishing state or return to men/women choice
  }

  endVote() {
    if (this.currentCategory === 'male') {
      this.categoryService.finishMaleVote();
    } else {
      this.categoryService.finishFemaleVote();
    }
    this.showCompetitors = false;
    this.chooseCategory = true;
  }
}
