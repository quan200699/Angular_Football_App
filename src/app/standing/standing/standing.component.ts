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
      this.getAllTeamByLeagueId(leagueId, this.statisticName);
    });
  }

  ngOnInit() {
  }

  getAllTeamByLeagueId(leagueId, statisticName) {
    this.teamService.getAllTeamFromLeague(leagueId).subscribe(async data => {
      this.listTeam = data.api.teams;
      let count = 0;
      for (let i = 0; i < this.listTeam.length; i++) {
        let teamName = this.listTeam[i].name;
        let teamLogo = this.listTeam[i].logo;
        let teamCode = this.listTeam[i].code;
        this.standing[count] = {
          team_id: this.listTeam[i].team_id,
          teamName: teamName,
          logo: teamLogo,
          code: teamCode,
          data: {
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
            let statistic = data2.api.statistics[statisticName];
            this.checkCriteria(statistic, this.standing[count].data, isHomeTeam);
            if (isHomeTeam) {
              statistic = statistic.home;
            } else {
              statistic = statistic.away;
            }
            this.standing[count].data.total += +statistic;
            // let x = await this.waitingForData();
          }
        }
        count++;
        this.loading = Math.ceil((count / this.listFixture.length) * 100);
      }
      this.standing = this.sortList(this.standing);
      this.dataTableService.createDataTable('standing');
    });
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
