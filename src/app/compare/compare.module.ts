import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareRoutingModule } from './compare-routing.module';
import { DetailComponent } from './detail/detail.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    CompareRoutingModule,
    FormsModule
  ]
})
export class CompareModule { }
