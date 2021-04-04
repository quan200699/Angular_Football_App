import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getAllTeamFromLeague(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/teams/league/${id}`);
  }

  getTeamById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/teams/team/${id}`);
  }
}
