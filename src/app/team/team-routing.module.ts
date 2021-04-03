import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTeamComponent} from './list-team/list-team.component';


const routes: Routes = [
  {
    path: 'teams',
    component: ListTeamComponent
  },
  {
    path: '**',
    redirectTo: 'teams'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
