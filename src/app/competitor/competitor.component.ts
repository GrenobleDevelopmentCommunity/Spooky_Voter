import { Component, OnInit, Input } from '@angular/core';
import { Competitor, CompetitorsService } from '../services/competitors.service';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.css']
})
export class CompetitorComponent implements OnInit {

  @Input() competitor: Competitor;

  constructor() { }

  ngOnInit() {
    console.log('onInit');
  }

}
