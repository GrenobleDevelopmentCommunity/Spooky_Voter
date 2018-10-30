import { Injectable } from '@angular/core';

export class Competitor {
  nickname: string;
  picture_link: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompetitorsService {

  COMPETITORS: Competitor[] = [
    // tslint:disable:max-line-length
    { nickname: 'Vasyl', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxbUNPj9mXo63Zy8e8reBQRBfnZa5FgqvByMXc7GVotGwugC8' },
    { nickname: 'Max', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' },
    { nickname: 'Seb', picture_link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg' },
    { nickname: 'Anton', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4e2VF6cfou9oL0cc5OAzVTEbmAgFjIW2r-7lTkpOljG9k38N' },
    { nickname: 'Raph', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' }
  ];
  index = 0;

  constructor() { }

  vote({ nickname }: Competitor): void {
    console.log(`Voted for ${nickname}`);
  }

  getNextCompetitor(): Promise<Competitor> {
    const comp = this.COMPETITORS[this.index];
    this.index++;
    // TODO: remove this line :
    if (this.index === this.COMPETITORS.length) {
      this.index = 0;
    }
    return new Promise<Competitor>((resolve, reject) => {
      setTimeout(() => {
        resolve(comp);
      }, 1000);
    }
    );
  }

  hasNextCompetitor(): boolean {
    return this.index < this.COMPETITORS.length;
  }
}
