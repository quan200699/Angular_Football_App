import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FixtureDetailComponent} from './fixture-detail/fixture-detail.component';


const routes: Routes = [
  {
    path: ':fixtureId',
    component: FixtureDetailComponent
  },
  {
    path: '**',
    redirectTo: ':fixtureId'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixtureRoutingModule {
}
