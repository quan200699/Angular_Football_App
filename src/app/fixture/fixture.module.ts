import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixtureRoutingModule } from './fixture-routing.module';
import { FixtureDetailComponent } from './fixture-detail/fixture-detail.component';


@NgModule({
  declarations: [FixtureDetailComponent],
  imports: [
    CommonModule,
    FixtureRoutingModule
  ]
})
export class FixtureModule { }
