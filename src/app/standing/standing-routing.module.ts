import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TotalShotsComponent} from './total-shots/total-shots.component';


const routes: Routes = [
  {
    path: 'total-shots',
    component: TotalShotsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingRoutingModule { }
