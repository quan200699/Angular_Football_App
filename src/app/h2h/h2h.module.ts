import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { H2hRoutingModule } from './h2h-routing.module';
import { H2hComponent } from './h2h/h2h.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [H2hComponent],
    imports: [
        CommonModule,
        H2hRoutingModule,
        FormsModule
    ]
})
export class H2hModule { }
