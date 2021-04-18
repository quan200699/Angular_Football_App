import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';
import {
  CORNER_KICKS,
  FOULS,
  GOAL_KEEPER_SAVES,
  OFFSIDES,
  SHOT_ON_GOALS,
  TOTAL_SHOTS,
  YELLOW_CARDS
} from '../../standing/standing/standing.component';
import {StatisticsService} from '../../service/statistics.service';

@Component({
  selector: 'app-h2h',
  templateUrl: './h2h.component.html',
  styleUrls: ['./h2h.component.css']
})
export class H2hComponent implements OnInit {
  h2hList: any = [];
  h2hTotalShot: any = [];
  h2hShotOnGoal: any = [];
  h2hCornerKick: any = [];
  h2hFoul: any = [];
  h2hOffside: any = [];
  h2hGoalKeeperSave: any = [];
  h2hYellowCard: any = [];
  h2hStatistics: any = [];
  loading = 0;
  statisticNames: string[] = [TOTAL_SHOTS, SHOT_ON_GOALS, CORNER_KICKS, FOULS, OFFSIDES, GOAL_KEEPER_SAVES, YELLOW_CARDS];
  statisticName: string = TOTAL_SHOTS;

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const team1Id = +paramMap.get('team1Id');
      const team2Id = +paramMap.get('team2Id');
      this.getAllH2hBetweenTwoTeam(team1Id, team2Id);
    });
  }

  ngOnInit() {
  }

  changeStatisticStandingShow(statisticName) {
    switch (statisticName) {
      case TOTAL_SHOTS: {
        this.h2hStatistics = this.h2hTotalShot;
        break;
      }
      case SHOT_ON_GOALS: {
        this.h2hStatistics = this.h2hShotOnGoal;
        break;
      }
      case FOULS: {
        this.h2hStatistics = this.h2hFoul;
        break;
      }
      case YELLOW_CARDS: {
        this.h2hStatistics = this.h2hYellowCard;
        break;
      }
      case GOAL_KEEPER_SAVES: {
        this.h2hStatistics = this.h2hGoalKeeperSave;
        break;
      }
      case OFFSIDES: {
        this.h2hStatistics = this.h2hOffside;
        break;
      }
      case CORNER_KICKS: {
        this.h2hStatistics = this.h2hCornerKick;
        break;
      }
    }
    this.h2hStatistics = this.sortList(this.h2hStatistics);
  }

  async getStatisticsByFixtureId(fixtureId: any, fixture) {
    this.statisticsService.getStatisticsByFixtureId(fixtureId).subscribe(data => {
      let homeTeam = fixture.homeTeam;
      let awayTeam = fixture.awayTeam;
      let fixtureId = fixture.fixture_id;
      let eventDate = fixture.event_date;
      let totalShot = data.api.statistics[TOTAL_SHOTS];
      let shotOnGoal = data.api.statistics[SHOT_ON_GOALS];
      let cornerKick = data.api.statistics[CORNER_KICKS];
      let offside = data.api.statistics.Offsides;
      let goalKeeperSave = data.api.statistics[GOAL_KEEPER_SAVES];
      let foul = data.api.statistics.Fouls;
      let yellowCard = data.api.statistics[YELLOW_CARDS];
      if (totalShot == null) {
        this.h2hTotalShot.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: '-',
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      } else {
        this.h2hTotalShot.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: totalShot.home + '-' + totalShot.away,
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      }
      if (shotOnGoal == null) {
        this.h2hShotOnGoal.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: '-',
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      } else {
        this.h2hShotOnGoal.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: shotOnGoal.home + '-' + shotOnGoal.away,
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      }
      if (cornerKick == null) {
        this.h2hCornerKick.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: '-',
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      } else {
        this.h2hCornerKick.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: cornerKick.home + '-' + cornerKick.away,
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      }
      if (offside == null) {
        this.h2hOffside.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: '-',
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      } else {
        this.h2hOffside.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: offside.home + '-' + offside.away,
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      }
      if (foul == null) {
        this.h2hFoul.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: '-',
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      } else {
        this.h2hFoul.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: foul.home + '-' + foul.away,
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      }
      if (goalKeeperSave == null) {
        this.h2hGoalKeeperSave.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: '-',
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      } else {
        this.h2hGoalKeeperSave.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: goalKeeperSave.home + '-' + goalKeeperSave.away,
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      }
      if (yellowCard == null) {
        this.h2hYellowCard.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: '-',
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      } else {
        this.h2hYellowCard.push({
          home: {
            teamId: homeTeam.team_id,
            name: homeTeam.team_name,
            logo: homeTeam.logo,
            code: homeTeam.code
          },
          away: {
            teamId: awayTeam.team_id,
            name: awayTeam.team_name,
            logo: awayTeam.logo,
            code: awayTeam.code
          },
          score: yellowCard.home + '-' + yellowCard.away,
          eventDate: eventDate,
          fixtureId: fixtureId
        });
      }
    });
  }

  getAllH2hBetweenTwoTeam(team1Id: number, team2Id: number) {
    this.fixtureService.getAllH2HBetweenTwoTeam(team1Id, team2Id).subscribe(async data => {
      this.h2hList = data.api.fixtures;
      let count = 0;
      for (let i = 0; i < this.h2hList.length; i++) {
        await this.getStatisticsByFixtureId(this.h2hList[i].fixture_id, this.h2hList[i]);
        this.loading = Math.ceil((++count / this.h2hList.length) * 100);
      }
      this.h2hStatistics = this.h2hTotalShot;
      this.h2hStatistics = this.sortList(this.h2hStatistics);
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

  sortList(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        let date1 = new Date(array[i].eventDate);
        let date2 = new Date(array[j].eventDate);
        if (date1.getTime() < date2.getTime()) {
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }
    return array;
  }
}
