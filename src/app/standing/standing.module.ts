import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingRoutingModule } from './standing-routing.module';
import { StandingComponent } from './standing/standing.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [StandingComponent],
    imports: [
        CommonModule,
        StandingRoutingModule,
        FormsModule
    ]
})
export class StandingModule { }
