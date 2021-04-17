(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["team-team-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/team/list-team/list-team.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/team/list-team/list-team.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"content\">\r\n  <div class=\"row\">\r\n    <div class=\"col-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <h3 class=\"card-title\">List Team</h3>\r\n        </div>\r\n        <!-- /.card-header -->\r\n        <div class=\"card-body\">\r\n          <table id=\"teams\" class=\"table table-bordered table-hover\">\r\n            <thead>\r\n            <tr>\r\n              <th>Logo</th>\r\n              <th>Team</th>\r\n              <th></th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <ng-container *ngFor=\"let team of listTeam\">\r\n              <tr>\r\n                <td><img [src]=\"team.logo\" [alt]=\"team.code\" width=\"100\" height=\"100\"></td>\r\n                <td>{{team.name}}</td>\r\n                <td><a [routerLink]=\"[team.team_id]\">Details</a></td>\r\n              </tr>\r\n            </ng-container>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n        <!-- /.card-body -->\r\n      </div>\r\n      <!-- /.card -->\r\n    </div>\r\n    <!-- /.col -->\r\n  </div>\r\n</div>\r\n<!-- /.row -->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/team/team-detail/team-detail.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/team/team-detail/team-detail.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"content\">\r\n  <div class=\"row\">\r\n    <div class=\"col-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <h3 class=\"card-title\">\r\n            <span>\r\n              <img [src]=\"currentTeam?.logo\" [alt]=\"currentTeam?.code\" width=\"100\" height=\"100\"\r\n                   style=\"margin-right: 30px\">\r\n              {{currentTeam?.name}}\r\n            </span>\r\n          </h3>\r\n          <div class=\"card-tools\">\r\n            <button type=\"button\" class=\"btn btn-tool\" data-card-widget=\"collapse\" data-toggle=\"tooltip\"\r\n                    title=\"Collapse\">\r\n              <i class=\"fas fa-minus\"></i></button>\r\n          </div>\r\n        </div>\r\n        <!-- /.card-header -->\r\n        <div class=\"card-body\">\r\n          <div class=\"progress progress-sm active\">\r\n            <div class=\"progress-bar bg-success progress-bar-striped\" role=\"progressbar\"\r\n                 aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" [style.width]=\"loading+'%'\">\r\n              <span class=\"sr-only\">{{loading}}% Complete</span>\r\n            </div>\r\n          </div>\r\n          <table id=\"statistics\" class=\"table table-bordered table-hover\">\r\n            <thead>\r\n            <tr>\r\n              <th>Criteria</th>\r\n              <th>Total</th>\r\n              <th>AVG</th>\r\n              <th>Win</th>\r\n              <th>Draw</th>\r\n              <th>Lose</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr>\r\n              <td>Total Shots:</td>\r\n              <td>{{getAllTotalInLeague(totalShots.total)}}</td>\r\n              <td>{{(getAllTotalInLeague(totalShots.total) / currentFixture).toFixed(2)}}</td>\r\n              <td>{{totalShots.win}}</td>\r\n              <td>{{totalShots.draw}}</td>\r\n              <td>{{totalShots.lose}}</td>\r\n            </tr>\r\n            <tr>\r\n              <td>Shot On Goals:</td>\r\n              <td>{{getAllTotalInLeague(shotOnGoals.total)}}</td>\r\n              <td>{{(getAllTotalInLeague(shotOnGoals.total) / currentFixture).toFixed(2)}}</td>\r\n              <td>{{shotOnGoals.win}}</td>\r\n              <td>{{shotOnGoals.draw}}</td>\r\n              <td>{{shotOnGoals.lose}}</td>\r\n            </tr>\r\n            <tr>\r\n              <td>Corner Kicks:</td>\r\n              <td>{{getAllTotalInLeague(cornerKicks.total)}}</td>\r\n              <td>{{(getAllTotalInLeague(cornerKicks.total) / currentFixture).toFixed(2)}}</td>\r\n              <td>{{cornerKicks.win}}</td>\r\n              <td>{{cornerKicks.draw}}</td>\r\n              <td>{{cornerKicks.lose}}</td>\r\n            </tr>\r\n            <tr>\r\n              <td>Offsides:</td>\r\n              <td>{{getAllTotalInLeague(offsides.total)}}</td>\r\n              <td>{{(getAllTotalInLeague(offsides.total) / currentFixture).toFixed(2)}}</td>\r\n              <td>{{offsides.win}}</td>\r\n              <td>{{offsides.draw}}</td>\r\n              <td>{{offsides.lose}}</td>\r\n            </tr>\r\n            <tr>\r\n              <td>Goal Keeper Saves:</td>\r\n              <td>{{getAllTotalInLeague(goalKeeperSaves.total)}}</td>\r\n              <td>{{(getAllTotalInLeague(goalKeeperSaves.total) / currentFixture).toFixed(2)}}</td>\r\n              <td>{{goalKeeperSaves.win}}</td>\r\n              <td>{{goalKeeperSaves.draw}}</td>\r\n              <td>{{goalKeeperSaves.lose}}</td>\r\n            </tr>\r\n            <tr>\r\n              <td>Fouls:</td>\r\n              <td>{{getAllTotalInLeague(fouls.total)}}</td>\r\n              <td>{{(getAllTotalInLeague(fouls.total) / currentFixture).toFixed(2)}}</td>\r\n              <td>{{fouls.win}}</td>\r\n              <td>{{fouls.draw}}</td>\r\n              <td>{{fouls.lose}}</td>\r\n            </tr>\r\n            <tr>\r\n              <td>Yellow Cards:</td>\r\n              <td>{{getAllTotalInLeague(yellowCards.total)}}</td>\r\n              <td>{{(getAllTotalInLeague(yellowCards.total) / currentFixture).toFixed(2)}}</td>\r\n              <td>{{yellowCards.win}}</td>\r\n              <td>{{yellowCards.draw}}</td>\r\n              <td>{{yellowCards.lose}}</td>\r\n            </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n        <!-- /.card-body -->\r\n      </div>\r\n      <!-- /.card -->\r\n    </div>\r\n    <!-- /.col -->\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <h3 class=\"card-title\">\r\n            Fixture\r\n          </h3>\r\n          <div class=\"card-tools\">\r\n            <button type=\"button\" class=\"btn btn-tool\" data-card-widget=\"collapse\" data-toggle=\"tooltip\"\r\n                    title=\"Collapse\">\r\n              <i class=\"fas fa-minus\"></i></button>\r\n          </div>\r\n        </div>\r\n        <!-- /.card-header -->\r\n        <div class=\"card-body\">\r\n          <table id=\"fixtures\" class=\"table table-hover\">\r\n            <tbody>\r\n            <ng-container *ngFor=\"let fixture of listFixture\">\r\n              <tr>\r\n                <td></td>\r\n                <td style=\"text-align: center\">{{fixture.status}}</td>\r\n                <td style=\"text-align: right\">\r\n                  <span>\r\n                    <img [src]=\"fixture.homeTeam.logo\" [alt]=\"fixture.homeTeam.code\" width=\"25\" height=\"25\">\r\n                    {{fixture.homeTeam.team_name}}\r\n                  </span>\r\n                </td>\r\n                <td style=\"text-align: center\">\r\n                  <a routerLink=\"/fixture/{{fixture.fixture_id}}\" *ngIf=\"fixture.statusShort == 'FT'\">\r\n                    {{fixture.score.fulltime}}\r\n                  </a>\r\n                  <span *ngIf=\"fixture.statusShort != 'FT'\">-</span>\r\n                </td>\r\n                <td>\r\n                  <span>\r\n                    <img [src]=\"fixture.awayTeam.logo\" [alt]=\"fixture.awayTeam.code\" width=\"25\" height=\"25\">\r\n                    {{fixture.awayTeam.team_name}}\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <a routerLink=\"/h2h/{{fixture.homeTeam.team_id}}/{{fixture.awayTeam.team_id}}\">\r\n                    H2H\r\n                  </a>\r\n                </td>\r\n                <td></td>\r\n              </tr>\r\n            </ng-container>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n        <!-- /.card-body -->\r\n      </div>\r\n      <!-- /.card -->\r\n    </div>\r\n    <!-- /.col -->\r\n  </div>\r\n</div>\r\n<!-- /.row -->\r\n");

/***/ }),

/***/ "./src/app/team/list-team/list-team.component.css":
/*!********************************************************!*\
  !*** ./src/app/team/list-team/list-team.component.css ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RlYW0vbGlzdC10ZWFtL2xpc3QtdGVhbS5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/team/list-team/list-team.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/team/list-team/list-team.component.ts ***!
  \*******************************************************/
/*! exports provided: ListTeamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListTeamComponent", function() { return ListTeamComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_team_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/team.service */ "./src/app/service/team.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _service_data_table_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/data-table.service */ "./src/app/service/data-table.service.ts");





let ListTeamComponent = class ListTeamComponent {
    constructor(teamService, activatedRoute, dataTableService) {
        this.teamService = teamService;
        this.activatedRoute = activatedRoute;
        this.dataTableService = dataTableService;
        this.listTeam = [];
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            const id = +paramMap.get('leagueId');
            this.getAllTeamByLeagueId(id);
        });
    }
    ngOnInit() {
    }
    getAllTeamByLeagueId(id) {
        this.teamService.getAllTeamFromLeague(id).subscribe(data => {
            this.listTeam = data.api.teams;
            this.dataTableService.createDataTable('teams');
        });
    }
};
ListTeamComponent.ctorParameters = () => [
    { type: _service_team_service__WEBPACK_IMPORTED_MODULE_2__["TeamService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _service_data_table_service__WEBPACK_IMPORTED_MODULE_4__["DataTableService"] }
];
ListTeamComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-list-team',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./list-team.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/team/list-team/list-team.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./list-team.component.css */ "./src/app/team/list-team/list-team.component.css")).default]
    })
], ListTeamComponent);



/***/ }),

/***/ "./src/app/team/team-detail/team-detail.component.css":
/*!************************************************************!*\
  !*** ./src/app/team/team-detail/team-detail.component.css ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RlYW0vdGVhbS1kZXRhaWwvdGVhbS1kZXRhaWwuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/team/team-detail/team-detail.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/team/team-detail/team-detail.component.ts ***!
  \***********************************************************/
/*! exports provided: TeamDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamDetailComponent", function() { return TeamDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _service_fixture_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/fixture.service */ "./src/app/service/fixture.service.ts");
/* harmony import */ var _service_statistics_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/statistics.service */ "./src/app/service/statistics.service.ts");
/* harmony import */ var _service_team_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../service/team.service */ "./src/app/service/team.service.ts");
/* harmony import */ var _service_data_table_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/data-table.service */ "./src/app/service/data-table.service.ts");
/* harmony import */ var _standing_standing_standing_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../standing/standing/standing.component */ "./src/app/standing/standing/standing.component.ts");








let TeamDetailComponent = class TeamDetailComponent {
    constructor(activatedRoute, fixtureService, statisticsService, teamService, dataTableService) {
        this.activatedRoute = activatedRoute;
        this.fixtureService = fixtureService;
        this.statisticsService = statisticsService;
        this.teamService = teamService;
        this.dataTableService = dataTableService;
        this.listFixture = [];
        this.totalShots = {
            total: [],
            win: 0,
            draw: 0,
            lose: 0
        };
        this.shotOnGoals = {
            total: [],
            win: 0,
            draw: 0,
            lose: 0
        };
        this.cornerKicks = {
            total: [],
            win: 0,
            draw: 0,
            lose: 0
        };
        this.offsides = {
            total: [],
            win: 0,
            draw: 0,
            lose: 0
        };
        this.goalKeeperSaves = {
            total: [],
            win: 0,
            draw: 0,
            lose: 0
        };
        this.fouls = {
            total: [],
            win: 0,
            draw: 0,
            lose: 0
        };
        this.yellowCards = {
            total: [],
            win: 0,
            draw: 0,
            lose: 0
        };
        this.loading = 0;
        this.currentFixture = 1;
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            const teamId = +paramMap.get('teamId');
            const leagueId = +paramMap.get('leagueId');
            this.getTeamById(teamId);
            this.getAllFixtureByTeamAndLeague(teamId, leagueId);
        });
    }
    ngOnInit() {
    }
    getTeamById(id) {
        this.teamService.getTeamById(id).subscribe(data => {
            this.currentTeam = data.api.teams[0];
        });
    }
    getAllFixtureByTeamAndLeague(teamId, leagueId) {
        this.fixtureService.getAllFixtureByTeamAndByLeague(teamId, leagueId).subscribe((data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.listFixture = data.api.fixtures;
            let count = 0;
            for (let i = 0; i < this.listFixture.length; i++) {
                const homeTeam = this.listFixture[i].homeTeam;
                const fixtureStatus = this.listFixture[i].statusShort;
                let isHomeTeam = false;
                if (homeTeam.team_id === teamId) {
                    isHomeTeam = true;
                }
                if (fixtureStatus == 'FT') {
                    let x = yield this.waitingForData(this.listFixture[i].fixture_id, isHomeTeam);
                    this.currentFixture++;
                }
                this.loading = Math.ceil((++count / this.listFixture.length) * 100);
            }
        }));
    }
    waitingForData(fixtureId, isHomeTeam) {
        return new Promise((resolve, reject) => setTimeout(() => {
            this.getStatisticsByFixtureId(fixtureId, isHomeTeam);
            resolve('success');
        }, 500));
    }
    getStatisticsByFixtureId(fixtureId, isHomeTeam) {
        this.statisticsService.getStatisticsByFixtureId(fixtureId).subscribe(data => {
            let totalShot = data.api.statistics[_standing_standing_standing_component__WEBPACK_IMPORTED_MODULE_7__["TOTAL_SHOTS"]];
            let shotOnGoal = data.api.statistics[_standing_standing_standing_component__WEBPACK_IMPORTED_MODULE_7__["SHOT_ON_GOALS"]];
            let cornerKick = data.api.statistics[_standing_standing_standing_component__WEBPACK_IMPORTED_MODULE_7__["CORNER_KICKS"]];
            let offside = data.api.statistics.Offsides;
            let goalKeeperSave = data.api.statistics[_standing_standing_standing_component__WEBPACK_IMPORTED_MODULE_7__["GOAL_KEEPER_SAVES"]];
            let foul = data.api.statistics.Fouls;
            let yellowCard = data.api.statistics[_standing_standing_standing_component__WEBPACK_IMPORTED_MODULE_7__["YELLOW_CARDS"]];
            this.checkCriteria(totalShot, this.totalShots, isHomeTeam);
            this.checkCriteria(shotOnGoal, this.shotOnGoals, isHomeTeam);
            this.checkCriteria(cornerKick, this.cornerKicks, isHomeTeam);
            this.checkCriteria(offside, this.offsides, isHomeTeam);
            this.checkCriteria(goalKeeperSave, this.goalKeeperSaves, isHomeTeam);
            this.checkCriteria(foul, this.fouls, isHomeTeam);
            this.checkCriteria(yellowCard, this.yellowCards, isHomeTeam);
            if (isHomeTeam) {
                totalShot = totalShot.home;
                shotOnGoal = shotOnGoal.home;
                cornerKick = cornerKick.home;
                offside = offside.home;
                goalKeeperSave = goalKeeperSave.home;
                foul = foul.home;
                yellowCard = yellowCard.home;
            }
            else {
                totalShot = totalShot.away;
                shotOnGoal = shotOnGoal.away;
                cornerKick = cornerKick.away;
                offside = offside.away;
                goalKeeperSave = goalKeeperSave.away;
                foul = foul.away;
                yellowCard = yellowCard.away;
            }
            this.totalShots.total.push(totalShot);
            this.shotOnGoals.total.push(shotOnGoal);
            this.cornerKicks.total.push(cornerKick);
            this.offsides.total.push(offside);
            this.goalKeeperSaves.total.push(goalKeeperSave);
            this.fouls.total.push(foul);
            this.yellowCards.total.push(yellowCard);
        });
    }
    getAllTotalInLeague(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += +array[i];
        }
        return sum;
    }
    checkCriteria(criteriaName, criteria, isHomeTeam) {
        if (isHomeTeam) {
            if (+criteriaName.home > +criteriaName.away) {
                criteria.win++;
            }
            else if (+criteriaName.home == +criteriaName.away) {
                criteria.draw++;
            }
            else {
                criteria.lose++;
            }
        }
        else {
            if (+criteriaName.home > +criteriaName.away) {
                criteria.lose++;
            }
            else if (+criteriaName.home == +criteriaName.away) {
                criteria.draw++;
            }
            else {
                criteria.win++;
            }
        }
    }
};
TeamDetailComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _service_fixture_service__WEBPACK_IMPORTED_MODULE_3__["FixtureService"] },
    { type: _service_statistics_service__WEBPACK_IMPORTED_MODULE_4__["StatisticsService"] },
    { type: _service_team_service__WEBPACK_IMPORTED_MODULE_5__["TeamService"] },
    { type: _service_data_table_service__WEBPACK_IMPORTED_MODULE_6__["DataTableService"] }
];
TeamDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-team-detail',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./team-detail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/team/team-detail/team-detail.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./team-detail.component.css */ "./src/app/team/team-detail/team-detail.component.css")).default]
    })
], TeamDetailComponent);



/***/ }),

/***/ "./src/app/team/team-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/team/team-routing.module.ts ***!
  \*********************************************/
/*! exports provided: TeamRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamRoutingModule", function() { return TeamRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _list_team_list_team_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list-team/list-team.component */ "./src/app/team/list-team/list-team.component.ts");
/* harmony import */ var _team_detail_team_detail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./team-detail/team-detail.component */ "./src/app/team/team-detail/team-detail.component.ts");





const routes = [
    {
        path: 'teams',
        component: _list_team_list_team_component__WEBPACK_IMPORTED_MODULE_3__["ListTeamComponent"]
    },
    {
        path: 'teams/:teamId',
        component: _team_detail_team_detail_component__WEBPACK_IMPORTED_MODULE_4__["TeamDetailComponent"]
    },
    {
        path: 'compare',
        loadChildren: () => Promise.all(/*! import() | compare-compare-module */[__webpack_require__.e("default~compare-compare-module~standing-standing-module"), __webpack_require__.e("compare-compare-module")]).then(__webpack_require__.bind(null, /*! ../compare/compare.module */ "./src/app/compare/compare.module.ts")).then(module => module.CompareModule)
    },
    {
        path: '',
        redirectTo: 'teams'
    }
];
let TeamRoutingModule = class TeamRoutingModule {
};
TeamRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], TeamRoutingModule);



/***/ }),

/***/ "./src/app/team/team.module.ts":
/*!*************************************!*\
  !*** ./src/app/team/team.module.ts ***!
  \*************************************/
/*! exports provided: TeamModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamModule", function() { return TeamModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _team_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./team-routing.module */ "./src/app/team/team-routing.module.ts");
/* harmony import */ var _list_team_list_team_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list-team/list-team.component */ "./src/app/team/list-team/list-team.component.ts");
/* harmony import */ var _team_detail_team_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./team-detail/team-detail.component */ "./src/app/team/team-detail/team-detail.component.ts");






let TeamModule = class TeamModule {
};
TeamModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_list_team_list_team_component__WEBPACK_IMPORTED_MODULE_4__["ListTeamComponent"], _team_detail_team_detail_component__WEBPACK_IMPORTED_MODULE_5__["TeamDetailComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _team_routing_module__WEBPACK_IMPORTED_MODULE_3__["TeamRoutingModule"]
        ]
    })
], TeamModule);



/***/ })

}]);
//# sourceMappingURL=team-team-module-es2015.js.map