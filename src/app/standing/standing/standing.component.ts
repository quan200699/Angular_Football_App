import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';
import {StatisticsService} from '../../service/statistics.service';
import {TeamService} from '../../service/team.service';
import {DataTableService} from '../../service/data-table.service';

@Component({
  selector: 'app-total-shots',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {
  listTeam: any = [];
  listFixture: any = [];
  standing: any = [];
  statisticName: string = '';
  loading = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService,
              private teamService: TeamService,
              private dataTableService: DataTableService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const leagueId = +paramMap.get('leagueId');
      this.statisticName = paramMap.get('statistic');
      this.getData(leagueId, this.statisticName);
    });
  }

  ngOnInit() {
  }

  getAllTeamByLeagueIdUsingPromise(leagueId) {
    return this.teamService.getAllTeamFromLeague(leagueId).toPromise();
  }

  async getData(leagueId, statisticName) {
    let dataForAllTeam = await this.getAllTeamByLeagueIdUsingPromise(leagueId);
    this.listTeam = dataForAllTeam.api.teams;
    let count = 0;
    for (let team of this.listTeam) {
      let teamFixture = await this.getAllFixtureTeamDataUsingAsync(team, leagueId);
      this.listFixture = teamFixture.api.fixtures;
      let x = 0;
      for (let fixture of this.listFixture) {
        const homeTeam = fixture.homeTeam;
        const fixtureStatus = fixture.statusShort;
        let isHomeTeam = false;
        if (homeTeam.team_id === team.team_id) {
          isHomeTeam = true;
        }
        if (fixtureStatus == 'FT') {
          let data2 = await this.getStatisticsByFixtureIdToPromise(fixture.fixture_id);
          let statistic = data2.api.statistics[statisticName];
          this.checkCriteria(statistic, this.standing[count].data, isHomeTeam);
          if (isHomeTeam) {
            statistic = statistic.home;
          } else {
            statistic = statistic.away;
          }
          this.standing[count].data.total += +statistic;
        }
      }
      count++;
      this.loading = Math.ceil((count / this.listFixture.length) * 100);
    }
    this.standing = this.sortList(this.standing);
    this.dataTableService.createDataTable('standing');
  }

  async getAllFixtureTeamDataUsingAsync(team, leagueId) {
    let teamName = team.name;
    let teamLogo = team.logo;
    let teamCode = team.code;
    this.standing.push({
      team_id: team.team_id,
      teamName: teamName,
      logo: teamLogo,
      code: teamCode,
      data: {
        total: 0,
        win: 0,
        draw: 0,
        lose: 0
      }
    });
    return await this.getAllFixtureByTeamAndLeagueToPromise(team.team_id, leagueId);
  }


  getAllFixtureByTeamAndLeagueToPromise(teamId: any, leagueId) {
    return this.fixtureService.getAllFixtureByTeamAndByLeague(teamId, leagueId).toPromise();
  }

  waitingForData() {
    return new Promise((resolve, reject) => setTimeout(() => {
      resolve('success');
    }, 1000));
  }

  getStatisticsByFixtureIdToPromise(fixtureId: any) {
    return this.statisticsService.getStatisticsByFixtureId(fixtureId).toPromise();
  }

  checkCriteria(criteriaName, criteria, isHomeTeam) {
    if (isHomeTeam) {
      if (+criteriaName.home > +criteriaName.away) {
        criteria.win++;
      } else if (+criteriaName.home == +criteriaName.away) {
        criteria.draw++;
      } else {
        criteria.lose++;
      }
    } else {
      if (+criteriaName.home > +criteriaName.away) {
        criteria.lose++;
      } else if (+criteriaName.home == +criteriaName.away) {
        criteria.draw++;
      } else {
        criteria.win++;
      }
    }
  }

  sortList(array) {
    return this.statisticsService.sortListDesc(array);
  }
}
