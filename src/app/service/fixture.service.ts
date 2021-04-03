import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  constructor(private http: HttpClient) {
  }

  getAllFixtureByTeamAndByLeague(teamId: any, leagueId: any): Observable<any> {
    return this.http.get<any>(`${API_URL}/fixtures/team/${teamId}/${leagueId}`);
  }
}
