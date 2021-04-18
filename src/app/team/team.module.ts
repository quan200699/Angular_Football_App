import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamRoutingModule} from './team-routing.module';
import {ListTeamComponent} from './list-team/list-team.component';
import {TeamDetailComponent} from './team-detail/team-detail.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListTeamComponent, TeamDetailComponent],
    imports: [
        CommonModule,
        TeamRoutingModule,
        FormsModule
    ]
})
export class TeamModule {
}
