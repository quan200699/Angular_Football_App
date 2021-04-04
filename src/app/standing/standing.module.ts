import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingRoutingModule } from './standing-routing.module';
import { TotalShotsComponent } from './total-shots/total-shots.component';


@NgModule({
  declarations: [TotalShotsComponent],
  imports: [
    CommonModule,
    StandingRoutingModule
  ]
})
export class StandingModule { }
