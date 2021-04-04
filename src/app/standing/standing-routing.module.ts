import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StandingComponent} from './standing/standing.component';


const routes: Routes = [
  {
    path: ':statistic',
    component: StandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingRoutingModule { }
