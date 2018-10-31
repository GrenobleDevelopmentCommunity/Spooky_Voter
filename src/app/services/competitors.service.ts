import { Injectable } from '@angular/core';
import { compileComponentFromMetadata } from '@angular/compiler';

export class Competitor {
  nickname: string;
  picture_link: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompetitorsService {

  // TODO: load data from server
  MALE_COMPETITORS: Competitor[] = [
    // tslint:disable:max-line-length
    { nickname: 'Vasyl', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxbUNPj9mXo63Zy8e8reBQRBfnZa5FgqvByMXc7GVotGwugC8' },
    { nickname: 'Max', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' },
    { nickname: 'Seb', picture_link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg' },
    { nickname: 'Anton', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4e2VF6cfou9oL0cc5OAzVTEbmAgFjIW2r-7lTkpOljG9k38N' },
    { nickname: 'Raph', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' }
  ];
  male_index = 0;

  FEMALE_COMPETITORS: Competitor[] = [
    // tslint:disable:max-line-length
    { nickname: 'Oriane', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxbUNPj9mXo63Zy8e8reBQRBfnZa5FgqvByMXc7GVotGwugC8' },
    { nickname: 'Heloise', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' },
    { nickname: 'Margo', picture_link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg' },
    { nickname: 'Marjo', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4e2VF6cfou9oL0cc5OAzVTEbmAgFjIW2r-7lTkpOljG9k38N' },
    { nickname: 'Romane', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' }
  ];
  female_index = 0;

  constructor() { }

  // TODO: Make it async
  vote({ nickname }: Competitor): void {
    console.log(`Voted for ${nickname}`);
  }

  getNextCompetitor(category: string): Competitor {
    let comp: Competitor;
    if (category === 'male') {
      comp = this.MALE_COMPETITORS[this.male_index];
      this.male_index++;
    } else {
      comp = this.FEMALE_COMPETITORS[this.female_index];
      this.female_index++;
    }
    return comp;
  }

  // TODO: Make it async
  hasNextCompetitor(category: string): boolean {
    if (category === 'male') {
      return this.male_index < this.MALE_COMPETITORS.length;
    } else {
      return this.female_index < this.FEMALE_COMPETITORS.length;
    }
  }
}
