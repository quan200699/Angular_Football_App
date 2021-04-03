import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {
  }

  getStatisticsByFixtureId(id: any): Observable<any> {
    return this.http.get<any>(`${API_URL}/statistics/fixture/${id}/`);
  }
}
