import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListTeamComponent} from './list-team/list-team.component';
import {TeamDetailComponent} from './team-detail/team-detail.component';


const routes: Routes = [
  {
    path: 'teams',
    component: ListTeamComponent
  },
  {
    path: 'teams/:id',
    component: TeamDetailComponent
  },
  {
    path: '',
    redirectTo: 'teams'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {
}
