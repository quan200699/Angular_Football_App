import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { ListTeamComponent } from './list-team/list-team.component';


@NgModule({
  declarations: [ListTeamComponent],
  imports: [
    CommonModule,
    TeamRoutingModule
  ]
})
export class TeamModule { }
