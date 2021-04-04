import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingRoutingModule } from './standing-routing.module';
import { StandingComponent } from './standing/standing.component';


@NgModule({
  declarations: [StandingComponent],
  imports: [
    CommonModule,
    StandingRoutingModule
  ]
})
export class StandingModule { }
