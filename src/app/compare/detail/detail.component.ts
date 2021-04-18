import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';
import {StatisticsService} from '../../service/statistics.service';
import {TeamService} from '../../service/team.service';
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
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  firstTeamTotalShot: any = {};
  firstTeamShotOnGoal: any = {};
  firstTeamCornerKick: any = {};
  firstTeamOffside: any = {};
  firstTeamGoalKeeperSave: any = {};
  firstTeamFoul: any = {};
  firstTeamYellowCard: any = {};
  secondTeamTotalShot: any = {};
  secondTeamShotOnGoal: any = {};
  secondTeamCornerKick: any = {};
  secondTeamOffside: any = {};
  secondTeamGoalKeeperSave: any = {};
  secondTeamFoul: any = {};
  secondTeamYellowCard: any = {};
  statisticNames: string[] = [TOTAL_SHOTS, SHOT_ON_GOALS, CORNER_KICKS, FOULS, OFFSIDES, GOAL_KEEPER_SAVES, YELLOW_CARDS];
  statisticName: string = TOTAL_SHOTS;
  firstTeam: any = {};
  secondTeam: any = {};
  loading = 0;
  count = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService,
              private teamService: TeamService) {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      const team1Id = +paramMap.get('team1Id');
      const team2Id = +paramMap.get('team2Id');
      const leagueId = +paramMap.get('leagueId');
      await this.init(team1Id, team2Id);
      await this.getTwoTeamInfo(leagueId, team1Id, team2Id);
      this.firstTeam = this.firstTeamTotalShot;
      this.secondTeam = this.secondTeamTotalShot;
    });
  }

  ngOnInit() {
  }

  async init(team1Id, team2Id) {
    let team1 = await this.getTeamById(team1Id);
    team1 = team1.api.teams[0];
    let team2 = await this.getTeamById(team2Id);
    team2 = team2.api.teams[0];

    this.firstTeamTotalShot = this.firstTeamShotOnGoal = this.firstTeamYellowCard
      = this.firstTeamCornerKick = this.firstTeamFoul = this.firstTeamOffside
      = this.firstTeamGoalKeeperSave = this.firstTeam = {
      team_id: team1.team_id,
      teamName: team1.team_name,
      logo: team1.logo,
      code: team1.code,
      data: {
        total: 0,
        win: 0,
        draw: 0,
        lose: 0,
        chainWins: 0,
        chainLose: 0,
        home: {
          win: 0,
          lose: 0,
          draw: 0,
          total: 0
        },
        away: {
          win: 0,
          lose: 0,
          draw: 0,
          total: 0
        }
      }
    };
    this.secondTeamTotalShot = this.secondTeamShotOnGoal = this.secondTeamYellowCard
      = this.secondTeamOffside = this.secondTeamGoalKeeperSave = this.secondTeamFoul
      = this.secondTeamCornerKick = this.secondTeam = {
      team_id: team2.team_id,
      teamName: team2.team_name,
      logo: team2.logo,
      code: team2.code,
      data: {
        total: 0,
        win: 0,
        draw: 0,
        lose: 0,
        chainWins: 0,
        chainLose: 0,
        home: {
          win: 0,
          lose: 0,
          draw: 0,
          total: 0
        },
        away: {
          win: 0,
          lose: 0,
          draw: 0,
          total: 0
        }
      }
    };
  }

  changeStatisticStandingShow(statisticName) {
    switch (statisticName) {
      case TOTAL_SHOTS: {
        this.firstTeam = this.firstTeamTotalShot;
        this.secondTeam = this.secondTeamTotalShot;
        break;
      }
      case SHOT_ON_GOALS: {
        this.firstTeam = this.firstTeamShotOnGoal;
        this.secondTeam = this.secondTeamShotOnGoal;
        break;
      }
      case FOULS: {
        this.firstTeam = this.firstTeamFoul;
        this.secondTeam = this.secondTeamFoul;
        break;
      }
      case YELLOW_CARDS: {
        this.firstTeam = this.firstTeamYellowCard;
        this.secondTeam = this.secondTeamYellowCard;
        break;
      }
      case GOAL_KEEPER_SAVES: {
        this.firstTeam = this.firstTeamGoalKeeperSave;
        this.secondTeam = this.secondTeamGoalKeeperSave;
        break;
      }
      case OFFSIDES: {
        this.firstTeam = this.firstTeamOffside;
        this.secondTeam = this.secondTeamOffside;
        break;
      }
      case CORNER_KICKS: {
        this.firstTeam = this.firstTeamCornerKick;
        this.secondTeam = this.secondTeamCornerKick;
        break;
      }
    }
  }

  getTeamById(id) {
    return this.teamService.getTeamById(id).toPromise();
  }

  async getTwoTeamInfo(leagueId: number, team1Id: number, team2Id: number) {
    let team1 = await this.getTeamById(team1Id);
    team1 = team1.api.teams[0];
    let team2 = await this.getTeamById(team2Id);
    team2 = team2.api.teams[0];
    this.firstTeamTotalShot = this.getAllTeamStatisticData(team1, leagueId, this.firstTeamTotalShot);
    this.firstTeamShotOnGoal = this.getAllTeamStatisticData(team1, leagueId, this.firstTeamShotOnGoal);
    this.firstTeamCornerKick = this.getAllTeamStatisticData(team1, leagueId, this.firstTeamCornerKick);
    this.firstTeamOffside = this.getAllTeamStatisticData(team1, leagueId, this.firstTeamOffside);
    this.firstTeamFoul = this.getAllTeamStatisticData(team1, leagueId, this.firstTeamFoul);
    this.firstTeamGoalKeeperSave = this.getAllTeamStatisticData(team1, leagueId, this.firstTeamGoalKeeperSave);
    this.firstTeamYellowCard = this.getAllTeamStatisticData(team1, leagueId, this.firstTeamYellowCard);
    this.secondTeamTotalShot = this.getAllTeamStatisticData(team2, leagueId, this.secondTeamTotalShot);
    this.secondTeamShotOnGoal = this.getAllTeamStatisticData(team2, leagueId, this.secondTeamShotOnGoal);
    this.secondTeamCornerKick = this.getAllTeamStatisticData(team2, leagueId, this.secondTeamCornerKick);
    this.secondTeamOffside = this.getAllTeamStatisticData(team2, leagueId, this.secondTeamOffside);
    this.secondTeamFoul = this.getAllTeamStatisticData(team2, leagueId, this.secondTeamFoul);
    this.secondTeamGoalKeeperSave = this.getAllTeamStatisticData(team2, leagueId, this.secondTeamGoalKeeperSave);
    this.secondTeamYellowCard = this.getAllTeamStatisticData(team2, leagueId, this.secondTeamYellowCard);
    let team1Fixture: any = await this.getAllFixtureByTeamAndLeagueToPromise(team1.team_id, leagueId);
    let team2Fixture: any = await this.getAllFixtureByTeamAndLeagueToPromise(team2.team_id, leagueId);
    team1Fixture = team1Fixture.api.fixtures;
    team2Fixture = team2Fixture.api.fixtures;
    let team1Data = await this.getAllStatisticForOneTeam(team1, team1Fixture, this.firstTeamTotalShot,
      this.firstTeamShotOnGoal, this.firstTeamCornerKick, this.firstTeamOffside,
      this.firstTeamGoalKeeperSave, this.firstTeamFoul, this.firstTeamYellowCard);
    let team2Data = await this.getAllStatisticForOneTeam(team2, team2Fixture, this.secondTeamTotalShot,
      this.secondTeamShotOnGoal, this.secondTeamCornerKick, this.secondTeamOffside,
      this.secondTeamGoalKeeperSave, this.secondTeamFoul, this.secondTeamYellowCard);
    this.firstTeamTotalShot = team1Data[0];
    this.firstTeamShotOnGoal = team1Data[1];
    this.firstTeamCornerKick = team1Data[2];
    this.firstTeamOffside = team1Data[3];
    this.firstTeamGoalKeeperSave = team1Data[4];
    this.firstTeamFoul = team1Data[5];
    this.firstTeamYellowCard = team1Data[6];
    this.secondTeamTotalShot = team2Data[0];
    this.secondTeamShotOnGoal = team2Data[1];
    this.secondTeamCornerKick = team2Data[2];
    this.secondTeamOffside = team2Data[3];
    this.secondTeamGoalKeeperSave = team2Data[4];
    this.secondTeamFoul = team2Data[5];
    this.secondTeamYellowCard = team2Data[6];
  }

  async getAllStatisticForOneTeam(team, teamFixture,
                                  totalShots, shotOnGoals, cornerKicks, offsides,
                                  goalKeeperSaves, fouls, yellowCards) {
    let size = teamFixture.length*2;
    for (let fixture of teamFixture) {
      const homeTeam = fixture.homeTeam;
      const fixtureStatus = fixture.statusShort;
      let isHomeTeam = false;
      if (homeTeam.team_id === team.team_id) {
        isHomeTeam = true;
      }
      if (fixtureStatus == 'FT') {
        let data2 = await this.getStatisticsByFixtureIdToPromise(fixture.fixture_id);
        let totalShot = data2.api.statistics[TOTAL_SHOTS];
        let shotOnGoal = data2.api.statistics[SHOT_ON_GOALS];
        let cornerKick = data2.api.statistics[CORNER_KICKS];
        let offside = data2.api.statistics.Offsides;
        let goalKeeperSave = data2.api.statistics[GOAL_KEEPER_SAVES];
        let foul = data2.api.statistics.Fouls;
        let yellowCard = data2.api.statistics[YELLOW_CARDS];
        this.checkCriteria(totalShot, totalShots.data, isHomeTeam);
        this.checkCriteria(shotOnGoal, shotOnGoals.data, isHomeTeam);
        this.checkCriteria(cornerKick, cornerKicks.data, isHomeTeam);
        this.checkCriteria(offside, offsides.data, isHomeTeam);
        this.checkCriteria(goalKeeperSave, goalKeeperSaves.data, isHomeTeam);
        this.checkCriteria(foul, fouls.data, isHomeTeam);
        this.checkCriteria(yellowCard, yellowCards.data, isHomeTeam);
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
        totalShots.total += +totalShot;
        shotOnGoals.total += +shotOnGoal;
        cornerKicks.total += +cornerKick;
        offsides.total += +offside;
        goalKeeperSaves.data.total += +goalKeeperSave;
        fouls.total += +foul;
        yellowCards.total += +yellowCard;
      }
      this.count++;
      this.loading = Math.ceil((this.count / size) * 100);
    }
    return [totalShots, shotOnGoals, cornerKicks, offsides, goalKeeperSaves, fouls, yellowCards];
  }

  getAllTeamStatisticData(team, leagueId, teamStatistic) {
    let teamName = team.name;
    let teamLogo = team.logo;
    let teamCode = team.code;
    teamStatistic = {
      team_id: team.team_id,
      teamName: teamName,
      logo: teamLogo,
      code: teamCode,
      data: {
        total: 0,
        win: 0,
        draw: 0,
        lose: 0,
        chainWins: 0,
        chainLose: 0,
        home: {
          win: 0,
          lose: 0,
          draw: 0,
          total: 0
        },
        away: {
          win: 0,
          lose: 0,
          draw: 0,
          total: 0
        }
      }
    };
    return teamStatistic;
  }


  getAllFixtureByTeamAndLeagueToPromise(teamId: any, leagueId) {
    return this.fixtureService.getAllFixtureByTeamAndByLeague(teamId, leagueId).toPromise();
  }

  getStatisticsByFixtureIdToPromise(fixtureId: any) {
    return this.statisticsService.getStatisticsByFixtureId(fixtureId).toPromise();
  }

  checkCriteria(criteriaName, criteria, isHomeTeam) {
    if (isHomeTeam) {
      criteria.home.total++;
      if (+criteriaName.home > +criteriaName.away) {
        criteria.win++;
        criteria.chainLoses = 0;
        criteria.chainWins++;
        criteria.home.win++;
      } else if (+criteriaName.home == +criteriaName.away) {
        criteria.draw++;
        criteria.chainLoses = 0;
        criteria.chainWins = 0;
        criteria.home.draw++;
      } else {
        criteria.lose++;
        criteria.chainWins = 0;
        criteria.chainLoses++;
        criteria.home.lose++;
      }
    } else {
      criteria.away.total++;
      if (+criteriaName.home > +criteriaName.away) {
        criteria.away.lose++;
        criteria.lose++;
        criteria.chainWins = 0;
        criteria.chainLoses++;
      } else if (+criteriaName.home == +criteriaName.away) {
        criteria.away.draw++;
        criteria.draw++;
        criteria.chainLoses = 0;
        criteria.chainWins = 0;
      } else {
        criteria.away.win++;
        criteria.win++;
        criteria.chainLoses = 0;
        criteria.chainWins++;
      }
    }
  }
}
