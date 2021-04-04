import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {H2hComponent} from './h2h/h2h.component';


const routes: Routes = [
  {
    path: ':team1Id/:team2Id',
    component: H2hComponent
  },
  {
    path: '**',
    redirectTo: ':team1Id/:team2Id'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class H2hRoutingModule { }
