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
  totalShots: any = [];
  shotOnGoals: any = [];
  cornerKicks: any = [];
  offSides: any = [];
  goalKeeperSaves: any = [];
  fouls: any = [];
  yellowCards: any = [];

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
        totalShot = totalShot.home;
        shotOnGoal = shotOnGoal.home;
        cornerKick = cornerKick.home;
        offSide = offSide.home;
        goalKeeperSave = goalKeeperSave.home;
        foul = foul.home;
        yellowCard = yellowCard.home;
      } else {
        totalShot = totalShot.away;
        shotOnGoal = shotOnGoal.away;
        cornerKick = cornerKick.away;
        offSide = offSide.away;
        goalKeeperSave = goalKeeperSave.away;
        foul = foul.away;
        yellowCard = yellowCard.away;
      }
      this.totalShots.push(totalShot);
      this.shotOnGoals.push(shotOnGoal);
      this.cornerKicks.push(cornerKick);
      this.offSides.push(offSide);
      this.goalKeeperSaves.push(goalKeeperSave);
      this.fouls.push(foul);
      this.yellowCards.push(yellowCard);
    });
  }

}
