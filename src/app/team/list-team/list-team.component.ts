import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../service/team.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DataTableService} from '../../service/data-table.service';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {
  listTeam: any = [];

  constructor(private teamService: TeamService,
              private activatedRoute: ActivatedRoute,
              private dataTableService: DataTableService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('leagueId');
      this.getAllTeamByLeagueId(id);
    });
  }

  ngOnInit() {
  }

  getAllTeamByLeagueId(id) {
    this.teamService.getAllTeamFromLeague(id).subscribe(data => {
      this.listTeam = data.api.teams;
      this.dataTableService.createDataTable('teams');
    });
  }

}
