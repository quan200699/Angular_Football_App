import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FixtureService} from './fixture.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  totalShots: any = {
    total: 0,
    win: 0,
    draw: 0,
    lose: 0
  };

  constructor(private http: HttpClient,
              private fixtureService: FixtureService,) {
  }

  getStatisticsByFixtureId(id: any): Observable<any> {
    return this.http.get<any>(`${API_URL}/statistics/fixture/${id}/`);
  }

  sortListDesc(array): any {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[i].data.total > array[j].data.total) {
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }
    return array;
  }

}
