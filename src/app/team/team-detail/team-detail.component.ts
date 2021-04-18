import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';
import {StatisticsService} from '../../service/statistics.service';
import {TeamService} from '../../service/team.service';
import {DataTableService} from '../../service/data-table.service';
import {
  CORNER_KICKS,
  FOULS,
  GOAL_KEEPER_SAVES,
  OFFSIDES,
  SHOT_ON_GOALS,
  TOTAL_SHOTS,
  YELLOW_CARDS
} from '../../standing/standing/standing.component';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  listFixture: any = [];
  totalShots: any = {
    total: [],
    win: 0,
    draw: 0,
    lose: 0
  };
  shotOnGoals: any = {
    total: [],
    win: 0,
    draw: 0,
    lose: 0
  };
  cornerKicks: any = {
    total: [],
    win: 0,
    draw: 0,
    lose: 0
  };
  offsides: any = {
    total: [],
    win: 0,
    draw: 0,
    lose: 0
  };
  goalKeeperSaves: any = {
    total: [],
    win: 0,
    draw: 0,
    lose: 0
  };
  fouls: any = {
    total: [],
    win: 0,
    draw: 0,
    lose: 0
  };
  yellowCards: any = {
    total: [],
    win: 0,
    draw: 0,
    lose: 0
  };
  currentTeam: any;
  loading = 0;
  currentFixture = 1;
  statistics: any = [];
  statisticsTotalShot: any = [];
  statisticsShotOnGoal: any = [];
  statisticsCornerKick: any = [];
  statisticsFoul: any = [];
  statisticsOffside: any = [];
  statisticsGoalKeeperSave: any = [];
  statisticsYellowCard: any = [];
  statisticNames: string[] = [TOTAL_SHOTS, SHOT_ON_GOALS, CORNER_KICKS, FOULS, OFFSIDES, GOAL_KEEPER_SAVES, YELLOW_CARDS];
  statisticName: string = TOTAL_SHOTS;

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService,
              private teamService: TeamService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const teamId = +paramMap.get('teamId');
      const leagueId = +paramMap.get('leagueId');
      this.initData();
      this.getTeamById(teamId);
      this.getAllFixtureByTeamAndLeague(teamId, leagueId);
    });
  }

  ngOnInit() {
  }

  initData() {
    this.statistics = this.statisticsTotalShot;
  }

  getTeamById(id) {
    this.teamService.getTeamById(id).subscribe(data => {
      this.currentTeam = data.api.teams[0];
    });
  }

  changeStatisticStandingShow(statisticName) {
    switch (statisticName) {
      case TOTAL_SHOTS: {
        this.statistics = this.statisticsTotalShot;
        break;
      }
      case SHOT_ON_GOALS: {
        this.statistics = this.statisticsShotOnGoal;
        break;
      }
      case FOULS: {
        this.statistics = this.statisticsFoul;
        break;
      }
      case YELLOW_CARDS: {
        this.statistics = this.statisticsYellowCard;
        break;
      }
      case GOAL_KEEPER_SAVES: {
        this.statistics = this.statisticsGoalKeeperSave;
        break;
      }
      case OFFSIDES: {
        this.statistics = this.statisticsOffside;
        break;
      }
      case CORNER_KICKS: {
        this.statistics = this.statisticsCornerKick;
        break;
      }
    }
  }

  getAllFixtureByTeamAndLeague(teamId: any, leagueId: any) {
    this.fixtureService.getAllFixtureByTeamAndByLeague(teamId, leagueId).subscribe(async data => {
      this.listFixture = data.api.fixtures;
      let count = 0;
      for (let i = 0; i < this.listFixture.length; i++) {
        const homeTeam = this.listFixture[i].homeTeam;
        let isHomeTeam = false;
        if (homeTeam.team_id === teamId) {
          isHomeTeam = true;
        }
        this.getStatisticsByFixtureId(this.listFixture[i].fixture_id, isHomeTeam, this.listFixture[i]);
        this.loading = Math.ceil((++count / this.listFixture.length) * 100);
      }
    });
  }

  getStatisticsByFixtureId(fixtureId: any, isHomeTeam: any, fixture) {
    this.statisticsService.getStatisticsByFixtureId(fixtureId).subscribe(data => {
      let homeTeam = fixture.homeTeam;
      let awayTeam = fixture.awayTeam;
      let fixtureShortStatus = fixture.statusShort;
      let fixtureStatus = fixture.status;
      if (fixtureShortStatus == 'FT') {
        let totalShot = data.api.statistics[TOTAL_SHOTS];
        let shotOnGoal = data.api.statistics[SHOT_ON_GOALS];
        let cornerKick = data.api.statistics[CORNER_KICKS];
        let offside = data.api.statistics.Offsides;
        let goalKeeperSave = data.api.statistics[GOAL_KEEPER_SAVES];
        let foul = data.api.statistics.Fouls;
        let yellowCard = data.api.statistics[YELLOW_CARDS];
        this.checkCriteria(totalShot, this.totalShots, isHomeTeam);
        this.checkCriteria(shotOnGoal, this.shotOnGoals, isHomeTeam);
        this.checkCriteria(cornerKick, this.cornerKicks, isHomeTeam);
        this.checkCriteria(offside, this.offsides, isHomeTeam);
        this.checkCriteria(goalKeeperSave, this.goalKeeperSaves, isHomeTeam);
        this.checkCriteria(foul, this.fouls, isHomeTeam);
        this.checkCriteria(yellowCard, this.yellowCards, isHomeTeam);
        this.statisticsTotalShot.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsShotOnGoal.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsCornerKick.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsOffside.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsFoul.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsGoalKeeperSave.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsYellowCard.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        if (isHomeTeam) {
          totalShot = totalShot.home;
          shotOnGoal = shotOnGoal.home;
          cornerKick = cornerKick.home;
          offside = offside.home;
          goalKeeperSave = goalKeeperSave.home;
          foul = foul.home;
          yellowCard = yellowCard.home;
        } else {
          totalShot = totalShot.away;
          shotOnGoal = shotOnGoal.away;
          cornerKick = cornerKick.away;
          offside = offside.away;
          goalKeeperSave = goalKeeperSave.away;
          foul = foul.away;
          yellowCard = yellowCard.away;
        }
        this.totalShots.total.push(totalShot);
        this.shotOnGoals.total.push(shotOnGoal);
        this.cornerKicks.total.push(cornerKick);
        this.offsides.total.push(offside);
        this.goalKeeperSaves.total.push(goalKeeperSave);
        this.fouls.total.push(foul);
        this.yellowCards.total.push(yellowCard);
        this.currentFixture++;
      } else {
        this.statisticsTotalShot.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsShotOnGoal.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsCornerKick.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsOffside.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsFoul.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsGoalKeeperSave.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
        this.statisticsYellowCard.push({
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
          status: fixtureStatus,
          shortStatus: fixtureShortStatus
        });
      }
    });
  }

  getAllTotalInLeague(array): number {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += +array[i];
    }
    return sum;
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
}
