import { Component, OnInit, OnDestroy } from '@angular/core';
import { UuidService } from './services/uuid.service';
import { Competitor, CompetitorsService } from './services/competitors.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Spooky-Voter';

  constructor(private uuidService: UuidService) { }

  ngOnInit(): void {

    if (!this.uuidService.haveUuid()) {
      this.uuidService.setUuid();
    }
    // this.categoryChoise();
  }

  ngOnDestroy(): void {
  }

  // categoryChoise() {
  //   this.chooseCategory = true;
  // }



}
