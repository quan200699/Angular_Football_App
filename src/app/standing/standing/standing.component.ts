import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';
import {StatisticsService} from '../../service/statistics.service';
import {TeamService} from '../../service/team.service';
import {DataTableService} from '../../service/data-table.service';

const SHOT_ON_GOALS = 'Shots on Goal';

const TOTAL_SHOTS = 'Total Shots';

const CORNER_KICKS = 'Corner Kicks';

const GOAL_KEEPER_SAVES = 'Goalkeeper Saves';

const YELLOW_CARDS = 'Yellow Cards';

const FOULS = 'Fouls';

const OFFSIDES = 'Offsides';

@Component({
  selector: 'app-total-shots',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {
  listTeam: any = [];
  listFixture: any = [];
  standingForTotalShot: any = [];
  standingForShotOnGoals: any = [];
  standingForFouls: any = [];
  standingForCornerKicks: any = [];
  standingForOffsides: any = [];
  standingForGoalKeeperSaves: any = [];
  standingForYellowCards: any = [];
  standing: any = [];
  statisticNames: string[] = [TOTAL_SHOTS, SHOT_ON_GOALS, CORNER_KICKS, FOULS, OFFSIDES, GOAL_KEEPER_SAVES, YELLOW_CARDS];
  statisticName: string = TOTAL_SHOTS;
  loading = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService,
              private teamService: TeamService,
              private dataTableService: DataTableService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.standing = this.standingForTotalShot;
      const leagueId = +paramMap.get('leagueId');
      this.getData(leagueId);
    });
  }

  ngOnInit() {
  }

  changeStatisticStandingShow(statisticName) {
    switch (statisticName) {
      case TOTAL_SHOTS: {
        this.standing = this.standingForTotalShot;
        break;
      }
      case SHOT_ON_GOALS: {
        this.standing = this.standingForShotOnGoals;
        break;
      }
      case FOULS: {
        this.standing = this.standingForFouls;
        break;
      }
      case YELLOW_CARDS: {
        this.standing = this.standingForYellowCards;
        break;
      }
      case GOAL_KEEPER_SAVES: {
        this.standing = this.standingForGoalKeeperSaves;
        break;
      }
      case OFFSIDES: {
        this.standing = this.standingForOffsides;
        break;
      }
      case CORNER_KICKS: {
        this.standing = this.standingForCornerKicks;
        break;
      }
    }
  }

  getAllTeamByLeagueIdUsingPromise(leagueId) {
    return this.teamService.getAllTeamFromLeague(leagueId).toPromise();
  }

  async getData(leagueId) {
    let dataForAllTeam = await this.getAllTeamByLeagueIdUsingPromise(leagueId);
    this.listTeam = dataForAllTeam.api.teams;
    let count = 0;
    for (let team of this.listTeam) {
      let teamFixture = await this.getAllFixtureTeamDataUsingAsync(team, leagueId);
      this.listFixture = teamFixture.api.fixtures;
      for (let fixture of this.listFixture) {
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
          this.checkCriteria(totalShot, this.standingForTotalShot[count].data, isHomeTeam);
          this.checkCriteria(shotOnGoal, this.standingForShotOnGoals[count].data, isHomeTeam);
          this.checkCriteria(cornerKick, this.standingForCornerKicks[count].data, isHomeTeam);
          this.checkCriteria(offside, this.standingForOffsides[count].data, isHomeTeam);
          this.checkCriteria(goalKeeperSave, this.standingForGoalKeeperSaves[count].data, isHomeTeam);
          this.checkCriteria(foul, this.standingForFouls[count].data, isHomeTeam);
          this.checkCriteria(yellowCard, this.standingForYellowCards[count].data, isHomeTeam);
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
          this.standingForTotalShot[count].data.total += +totalShot;
          this.standingForShotOnGoals[count].data.total += +totalShot;
          this.standingForCornerKicks[count].data.total += +totalShot;
          this.standingForOffsides[count].data.total += +totalShot;
          this.standingForGoalKeeperSaves[count].data.total += +totalShot;
          this.standingForFouls[count].data.total += +totalShot;
          this.standingForYellowCards[count].data.total += +totalShot;
        }
      }
      count++;
      this.loading = Math.ceil((count / this.listFixture.length) * 100);
    }
    this.standingForTotalShot = this.sortList(this.standingForTotalShot);
    this.dataTableService.createDataTable('standing');
  }

  async getAllFixtureTeamDataUsingAsync(team, leagueId) {
    let teamName = team.name;
    let teamLogo = team.logo;
    let teamCode = team.code;
    this.standingForTotalShot.push({
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
    this.standingForShotOnGoals.push({
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
    this.standingForCornerKicks.push({
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
    this.standingForOffsides.push({
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
    this.standingForGoalKeeperSaves.push({
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
    this.standingForFouls.push({
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
    this.standingForYellowCards.push({
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
