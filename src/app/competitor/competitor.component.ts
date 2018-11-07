import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Competitor, CompetitorsService } from '../services/competitors.service';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.css']
})
export class CompetitorComponent implements OnInit, OnDestroy, OnChanges {

  @Input() competitor: Competitor;

  constructor() { }

  ngOnInit() {
    // console.log('onInit');
  }

  ngOnDestroy(): void {
    // console.log('OnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.competitor);
  }


}
