import { Component, OnInit } from '@angular/core';
import { UuidService } from './services/uuid.service';
import { Competitor, CompetitorsService } from './services/competitors.service';

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

  constructor(private uuidService: UuidService, private competitorsService: CompetitorsService) { }

  ngOnInit(): void {
    if (!this.uuidService.haveUuid()) {
      this.uuidService.setUuid();
    }
    this.initCompetitors();
  }


  initCompetitors() {

    Promise.all([
      this.competitorsService.getNextCompetitor(),
      this.competitorsService.getNextCompetitor()
    ]).then(
      (competitors: Competitor[]) => {
        this.competitor1 = competitors[0];
        this.competitor2 = competitors[1];
        this.showCompetitors = true;
      }
    );
  }


  // TODO: Merge both vote methods
  voteUp() {
    this.competitorsService.vote(this.competitor1);
    if (this.competitorsService.hasNextCompetitor()) {
      // this.competitor2 = this.competitorsService.getNextCompetitor();
      this.competitorsService.getNextCompetitor().then(
        (comp: Competitor) => this.competitor2 = comp
      );
    }
    // TODO: Add finishing state or return to men/women choice
  }

  voteDown() {
    this.competitorsService.vote(this.competitor2);
    if (this.competitorsService.hasNextCompetitor()) {
      // this.competitor1 = this.competitorsService.getNextCompetitor();
      this.competitorsService.getNextCompetitor().then(
        (comp: Competitor) => this.competitor1 = comp
      );
    }
    // TODO: Add finishing state or return to men/women choice
  }
}
