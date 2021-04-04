import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FixtureDetailComponent} from './fixture-detail/fixture-detail.component';


const routes: Routes = [
  {
    path: '',
    component: FixtureDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixtureRoutingModule {
}
