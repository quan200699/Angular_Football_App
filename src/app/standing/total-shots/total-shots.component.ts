import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';
import {StatisticsService} from '../../service/statistics.service';
import {TeamService} from '../../service/team.service';
import {DataTableService} from '../../service/data-table.service';

@Component({
  selector: 'app-total-shots',
  templateUrl: './total-shots.component.html',
  styleUrls: ['./total-shots.component.css']
})
export class TotalShotsComponent implements OnInit {
  listTeam: any = [];
  listFixture: any = [];
  standing: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService,
              private teamService: TeamService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const leagueId = +paramMap.get('leagueId');
      this.getAllTeamByLeagueId(leagueId);
    });
  }

  ngOnInit() {
  }

  getAllTeamByLeagueId(leagueId) {
    this.teamService.getAllTeamFromLeague(leagueId).subscribe(async data => {
      this.listTeam = data.api.teams;
      let count = 0;
      for (let i = 0; this.listTeam.length; i++) {
        let teamName = this.listTeam[i].name;
        let teamLogo = this.listTeam[i].logo;
        let teamCode = this.listTeam[i].code;
        this.standing[count] = {
          team_id: this.listTeam[i].team_id,
          teamName: teamName,
          logo: teamLogo,
          code: teamCode,
          totalShots: {
            total: 0,
            win: 0,
            draw: 0,
            lose: 0
          }
        };
        let data1 = await this.getAllFixtureByTeamAndLeagueToPromise(this.listTeam[i].team_id, leagueId);
        this.listFixture = data1.api.fixtures;
        for (let j = 0; j < this.listFixture.length; j++) {
          const homeTeam = this.listFixture[j].homeTeam;
          const fixtureStatus = this.listFixture[j].statusShort;
          let isHomeTeam = false;
          if (homeTeam.team_id === this.listTeam[i].team_id) {
            isHomeTeam = true;
          }
          if (fixtureStatus == 'FT') {
            let data2 = await this.getStatisticsByFixtureIdToPromise(this.listFixture[i].fixture_id);
            let totalShot = data2.api.statistics['Total Shots'];
            this.checkCriteria(totalShot, this.standing[count].totalShots, isHomeTeam);
            if (isHomeTeam) {
              totalShot = totalShot.home;
            } else {
              totalShot = totalShot.away;
            }
            this.standing[count].totalShots.total += +totalShot;
            let x = await this.waitingForData();
          }
        }
        count++;
      }
    });
  }

  getAllFixtureByTeamAndLeagueToPromise(teamId: any, leagueId) {
    return this.fixtureService.getAllFixtureByTeamAndByLeague(teamId, leagueId).toPromise();
  }

  waitingForData() {
    return new Promise((resolve, reject) => setTimeout(() => {
      resolve('success');
    }, 2000));
  }

  getStatisticsByFixtureIdToPromise(fixtureId: any) {
    return this.statisticsService.getStatisticsByFixtureId(fixtureId).toPromise();
  }

  checkCriteria(criteriaName, criteria, isHomeTeam) {
    if (isHomeTeam) {
      if (criteriaName.home > criteriaName.away) {
        criteria.win++;
      } else if (criteriaName.home < criteriaName.away) {
        criteria.lose++;
      } else {
        criteria.draw++;
      }
    } else {
      if (criteriaName.away > criteriaName.home) {
        criteria.win++;
      } else if (criteriaName.away < criteriaName.home) {
        criteria.lose++;
      } else {
        criteria.draw++;
      }
    }
  }

  sortList(array) {
    return this.statisticsService.sortListDesc(array);
  }
}
