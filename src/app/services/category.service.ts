import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  finishMaleVote() {
    localStorage.setItem('male', 'true');
  }

  finishFemaleVote() {
    localStorage.setItem('female', 'true');
  }

  isMaleVoteFinished(): boolean {
    return localStorage.getItem('male') === 'true';
  }

  isFemaleVoteFinished(): boolean {
    return localStorage.getItem('female') === 'true';
  }
}
