import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';

@Component({
  selector: 'app-h2h',
  templateUrl: './h2h.component.html',
  styleUrls: ['./h2h.component.css']
})
export class H2hComponent implements OnInit {
  h2hList: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const team1Id = +paramMap.get('team1Id');
      const team2Id = +paramMap.get('team2Id');
      this.getAllH2hBetweenTwoTeam(team1Id, team2Id);
    });
  }

  ngOnInit() {
  }

  getAllH2hBetweenTwoTeam(team1Id: number, team2Id: number) {
    this.fixtureService.getAllH2HBetweenTwoTeam(team1Id, team2Id).subscribe(data => {
      this.h2hList = data.api.fixtures;
    });
  }

  convertDateToString(date: any): string {
    date = new Date(date);
    let result = '';
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let year = date.getFullYear();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    result = day + '/' + month + '/' + year;
    return result;
  }
}
