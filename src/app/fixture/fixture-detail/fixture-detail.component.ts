import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {StatisticsService} from '../../service/statistics.service';
import {FixtureService} from '../../service/fixture.service';

@Component({
  selector: 'app-fixture-detail',
  templateUrl: './fixture-detail.component.html',
  styleUrls: ['./fixture-detail.component.css']
})
export class FixtureDetailComponent implements OnInit {
  statistics: any = {};
  currentFixture: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private fixtureService: FixtureService,
              private statisticsService: StatisticsService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const fixtureId = +paramMap.get('fixtureId');
      this.getFixtureById(fixtureId);
      this.getStatisticsByFixtureId(fixtureId);
    });
  }

  ngOnInit() {
  }

  getStatisticsByFixtureId(fixtureId: any) {
    this.statisticsService.getStatisticsByFixtureId(fixtureId).subscribe(data => {
      this.statistics = data.api.statistics;
    });
  }

  getFixtureById(fixtureId: any) {
    this.fixtureService.getFixtureById(fixtureId).subscribe(data => {
      this.currentFixture = data.api.fixtures[0];
    });
  }
}
