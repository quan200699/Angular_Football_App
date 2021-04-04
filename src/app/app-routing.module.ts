import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: 'league/:leagueId',
    loadChildren: () => import('./team/team.module').then(module => module.TeamModule)
  },
  {
    path: 'fixture/:fixtureId',
    loadChildren: () => import('./fixture/fixture.module').then(module => module.FixtureModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
