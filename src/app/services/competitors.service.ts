import { Injectable } from '@angular/core';
import { compileComponentFromMetadata } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UuidService } from './uuid.service';

export class Competitor {
  uid: string;
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
    { uid: 'blop', nickname: 'Vasyl', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxbUNPj9mXo63Zy8e8reBQRBfnZa5FgqvByMXc7GVotGwugC8' },
    { uid: 'blop', nickname: 'Max', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' },
    { uid: 'blop', nickname: 'Seb', picture_link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg' },
    { uid: 'blop', nickname: 'Anton', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4e2VF6cfou9oL0cc5OAzVTEbmAgFjIW2r-7lTkpOljG9k38N' },
    { uid: 'blop', nickname: 'Raph', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' }
  ];
  male_index = 0;

  FEMALE_COMPETITORS: Competitor[] = [
    // tslint:disable:max-line-length
    { uid: 'blop', nickname: 'Oriane', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxbUNPj9mXo63Zy8e8reBQRBfnZa5FgqvByMXc7GVotGwugC8' },
    { uid: 'blop', nickname: 'Heloise', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' },
    { uid: 'blop', nickname: 'Margo', picture_link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg' },
    { uid: 'blop', nickname: 'Marjo', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4e2VF6cfou9oL0cc5OAzVTEbmAgFjIW2r-7lTkpOljG9k38N' },
    { uid: 'blop', nickname: 'Romane', picture_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8Jz9HWznGSe5UmiA7aTpyr4h0ZbU6kMaNVtLoe1bzXJePHXG' }
  ];
  female_index = 0;

  constructor(private http: HttpClient, private uuidService: UuidService) {
    this.getCompetitors();
  }

  // TODO: REFACTOR
  getCompetitors(): void {
    this.http.get(environment.apiUrl + '/users/male').subscribe(
      (data) => {
        data['body'].forEach(male => {
          this.MALE_COMPETITORS.push({ uid: male['uid'], nickname: male['nickname'], picture_link: male['photo_link'] });
        });
      }
    );
    this.http.get(environment.apiUrl + '/users/female').subscribe(
      (data) => {
        data['body'].forEach(female => {
          this.FEMALE_COMPETITORS.push({ uid: female['uid'], nickname: female['nickname'], picture_link: female['photo_link'] });
        });
      }
    );
  }

  vote({ nickname, uid }: Competitor): void {
    console.log(`Voted for ${nickname}`);
    const body = { client_uid: this.uuidService.getUuid(), user_vote: uid };
    this.http.post(environment.apiUrl + '/clients/vote', body).subscribe();
  }

  // TODO: implement logic when using back arrow
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


  hasNextCompetitor(category: string): boolean {
    if (category === 'male') {
      return this.male_index < this.MALE_COMPETITORS.length;
    } else {
      return this.female_index < this.FEMALE_COMPETITORS.length;
    }
  }
}
