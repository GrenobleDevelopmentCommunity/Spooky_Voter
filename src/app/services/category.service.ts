import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  maleVoteDone = false;
  femaleVoteDone = false;

  constructor() {
    if (!!localStorage.getItem('male')) {
      this.maleVoteDone = true;
    }
    if (!!localStorage.getItem('female')) {
      this.femaleVoteDone = true;
    }
  }

  finishMaleVote() {
    localStorage.setItem('male', 'true');
    this.maleVoteDone = true;
  }

  finishFemaleVote() {
    localStorage.setItem('female', 'true');
    this.femaleVoteDone = true;
  }

  isMaleVoteFinished(): boolean {
    return this.maleVoteDone;
  }

  isFemaleVoteFinished(): boolean {
    return this.femaleVoteDone;
  }
}
