import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  maleVoteDone = false;
  femaleVoteDone = false;

  constructor() { }

  finishMaleVote() {
    this.maleVoteDone = true;
  }

  finishFemaleVote() {
    this.femaleVoteDone = true;
  }

  isMaleVoteFinished(): boolean {
    return this.maleVoteDone;
  }

  isFemaleVoteFinished(): boolean {
    return this.femaleVoteDone;
  }
}
