import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';
import {StatisticsService} from '../../service/statistics.service';
import {TeamService} from '../../service/team.service';
import {DataTableService} from '../../service/data-table.service';
import {CORNER_KICKS, GOAL_KEEPER_SAVES, SHOT_ON_GOALS, TOTAL_SHOTS, YELLOW_CARDS} from '../../standing/standing/standing.component';

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

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService,
              private teamService: TeamService,
              private dataTableService: DataTableService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const teamId = +paramMap.get('teamId');
      const leagueId = +paramMap.get('leagueId');
      this.getTeamById(teamId);
      this.getAllFixtureByTeamAndLeague(teamId, leagueId);
    });
  }

  ngOnInit() {
  }

  getTeamById(id) {
    this.teamService.getTeamById(id).subscribe(data => {
      this.currentTeam = data.api.teams[0];
    });
  }

  getAllFixtureByTeamAndLeague(teamId: any, leagueId: any) {
    this.fixtureService.getAllFixtureByTeamAndByLeague(teamId, leagueId).subscribe(async data => {
      this.listFixture = data.api.fixtures;
      let count = 0;
      for (let i = 0; i < this.listFixture.length; i++) {
        const homeTeam = this.listFixture[i].homeTeam;
        const fixtureStatus = this.listFixture[i].statusShort;
        let isHomeTeam = false;
        if (homeTeam.team_id === teamId) {
          isHomeTeam = true;
        }
        if (fixtureStatus == 'FT') {
          let x = await this.waitingForData(this.listFixture[i].fixture_id, isHomeTeam);
          this.currentFixture++;
        }
        this.loading = Math.ceil((++count / this.listFixture.length) * 100);
      }
    });
  }

  waitingForData(fixtureId, isHomeTeam) {
    return new Promise((resolve, reject) => setTimeout(() => {
      this.getStatisticsByFixtureId(fixtureId, isHomeTeam);
      resolve('success');
    }, 500));
  }

  getStatisticsByFixtureId(fixtureId: any, isHomeTeam: any) {
    this.statisticsService.getStatisticsByFixtureId(fixtureId).subscribe(data => {
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
