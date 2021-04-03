import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FixtureService} from '../../service/fixture.service';
import {StatisticsService} from '../../service/statistics.service';

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
  offSides: any = {
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

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const teamId = +paramMap.get('teamId');
      const leagueId = +paramMap.get('leagueId');
      this.getAllFixtureByTeamAndLeague(teamId, leagueId);
    });
  }

  ngOnInit() {
  }

  getAllFixtureByTeamAndLeague(teamId: any, leagueId: any) {
    this.fixtureService.getAllFixtureByTeamAndByLeague(teamId, leagueId).subscribe(data => {
      this.listFixture = data.api.fixtures;
      for (let i = 0; i < this.listFixture.length; i++) {
        const homeTeam = this.listFixture[i].homeTeam;
        let isHomeTeam = false;
        if (homeTeam.team_id === teamId) {
          isHomeTeam = true;
        }
        setTimeout(() => {
          this.getStatisticsByFixtureId(this.listFixture[i].fixture_id, isHomeTeam);
        }, 30000);
      }
    });
  }

  getStatisticsByFixtureId(fixtureId: any, isHomeTeam: any) {
    this.statisticsService.getStatisticsByFixtureId(fixtureId).subscribe(data => {
      let totalShot = data.api.statistics['Total Shots'];
      let shotOnGoal = data.api.statistics['Shot On Goals'];
      let cornerKick = data.api.statistics['Corner Kicks'];
      let offSide = data.api.statistics.Offsides;
      let goalKeeperSave = data.api.statistics['Goalkeeper Saves'];
      let foul = data.api.statistics.Fouls;
      let yellowCard = data.api.statistics['Yellow Cards'];
      if (isHomeTeam) {
        if (totalShot.home > totalShot.away) {
          this.totalShots.win++;
        } else if (totalShot.home < totalShot.away) {
          this.totalShots.lose++;
        }
        if (shotOnGoal.home > shotOnGoal.away) {
          this.shotOnGoals.win++;
        } else if (shotOnGoal.home < shotOnGoal.away) {
          this.shotOnGoals.lose++;
        }
        if (cornerKick.home > cornerKick.away) {
          this.cornerKicks.win++;
        } else if (cornerKick.home < cornerKick.away) {
          this.cornerKicks.lose++;
        }
        if (offSide.home > offSide.away) {
          this.offSides.win++;
        } else if (offSide.home < offSide.away) {
          this.offSides.lose++;
        }
        if (goalKeeperSave.home > goalKeeperSave.away) {
          this.goalKeeperSaves.win++;
        } else if (goalKeeperSave.home < goalKeeperSave.away) {
          this.goalKeeperSaves.lose++;
        }
        if (foul.home > foul.away) {
          this.fouls.win++;
        } else if (foul.home < foul.away) {
          this.fouls.lose++;
        }
        if (yellowCard.home > yellowCard.away) {
          this.yellowCards.win++;
        } else if (yellowCard.home < yellowCard.away) {
          this.yellowCards.lose++;
        }
        totalShot = totalShot.home;
        shotOnGoal = shotOnGoal.home;
        cornerKick = cornerKick.home;
        offSide = offSide.home;
        goalKeeperSave = goalKeeperSave.home;
        foul = foul.home;
        yellowCard = yellowCard.home;
      } else {

        if (totalShot.home < totalShot.away) {
          this.totalShots.win++;
        } else if (totalShot.home > totalShot.away) {
          this.totalShots.lose++;
        }
        if (shotOnGoal.home < shotOnGoal.away) {
          this.shotOnGoals.win++;
        } else if (shotOnGoal.home > shotOnGoal.away) {
          this.shotOnGoals.lose++;
        }
        if (cornerKick.home < cornerKick.away) {
          this.cornerKicks.win++;
        } else if (cornerKick.home > cornerKick.away) {
          this.cornerKicks.lose++;
        }
        if (offSide.home < offSide.away) {
          this.offSides.win++;
        } else if (offSide.home > offSide.away) {
          this.offSides.lose++;
        }
        if (goalKeeperSave.home < goalKeeperSave.away) {
          this.goalKeeperSaves.win++;
        } else if (goalKeeperSave.home > goalKeeperSave.away) {
          this.goalKeeperSaves.lose++;
        }
        if (foul.home < foul.away) {
          this.fouls.win++;
        } else if (foul.home > foul.away) {
          this.fouls.lose++;
        }
        if (yellowCard.home < yellowCard.away) {
          this.yellowCards.win++;
        } else if (yellowCard.home > yellowCard.away) {
          this.yellowCards.lose++;
        }
        totalShot = totalShot.away;
        shotOnGoal = shotOnGoal.away;
        cornerKick = cornerKick.away;
        offSide = offSide.away;
        goalKeeperSave = goalKeeperSave.away;
        foul = foul.away;
        yellowCard = yellowCard.away;
      }
      if (shotOnGoal.home == shotOnGoal.away) {
        this.shotOnGoals.draw++;
      }
      if (cornerKick.home == cornerKick.away) {
        this.cornerKicks.draw++;
      }
      if (cornerKick.home == cornerKick.away) {
        this.cornerKicks.draw++;
      }
      if (offSide.home == offSide.away) {
        this.offSides.draw++;
      }
      if (foul.home == foul.away) {
        this.fouls.draw++;
      }
      if (yellowCard.home == yellowCard.away) {
        this.yellowCards.draw++;
      }
      this.totalShots.total.push(totalShot);
      this.shotOnGoals.total.push(shotOnGoal);
      this.cornerKicks.total.push(cornerKick);
      this.offSides.total.push(offSide);
      this.goalKeeperSaves.total.push(goalKeeperSave);
      this.fouls.total.push(foul);
      this.yellowCards.total.push(yellowCard);
    });
  }

}
