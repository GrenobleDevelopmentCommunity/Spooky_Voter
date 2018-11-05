import { Component, OnInit } from '@angular/core';
import { UuidService } from './services/uuid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spooky-Voter';

  constructor(private uuidService: UuidService) { }

  ngOnInit(): void {

    if (!this.uuidService.haveUuid()) {
      this.uuidService.setUuid();
    }
    // this.categoryChoise();
  }

  // categoryChoise() {
  //   this.chooseCategory = true;
  // }



}
