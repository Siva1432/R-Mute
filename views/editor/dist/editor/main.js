(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.routing": [
		"./src/app/app.routing.ts",
		"common",
		"app-routing"
	],
	"./editor-module.routing": [
		"./src/app/editor-module.routing.ts",
		"common",
		"editor-module-routing"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/components/app/app.component.css":
/*!**************************************************!*\
  !*** ./src/app/components/app/app.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/app/app.component.html":
/*!***************************************************!*\
  !*** ./src/app/components/app/app.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/components/app/app.component.ts":
/*!*************************************************!*\
  !*** ./src/app/components/app/app.component.ts ***!
  \*************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/components/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/components/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/gaurds/app.gaurd.ts":
/*!*************************************!*\
  !*** ./src/app/gaurds/app.gaurd.ts ***!
  \*************************************/
/*! exports provided: AppGaurd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppGaurd", function() { return AppGaurd; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");





var AppGaurd = /** @class */ (function () {
    function AppGaurd(cs, router, http) {
        this.cs = cs;
        this.router = router;
        this.http = http;
    }
    AppGaurd.prototype.canActivate = function (route, state) {
        var _this = this;
        var xsrfCookie = this.cs.get('xsrfToken');
        console.log('got xsrfCookie :', xsrfCookie);
        if (xsrfCookie) {
            var httpOptions = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
                    'Content-Type': 'application/json'
                }), observe: 'response',
                withCredentials: 'true'
            };
            this.http.post('http://localhost:4500/authorize/getuser', httpOptions)
                .subscribe(function (res) {
                console.log('got response', res);
                if (res._id) {
                    _this.router.navigate(['/authorized/', res._id], { queryParamsHandling: 'merge' });
                }
                else {
                }
                ;
            });
            return false;
        }
        else {
            return true;
        }
    };
    AppGaurd = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], AppGaurd);
    return AppGaurd;
}());



/***/ }),

/***/ "./src/app/root.module.ts":
/*!********************************!*\
  !*** ./src/app/root.module.ts ***!
  \********************************/
/*! exports provided: RootModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootModule", function() { return RootModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/app/app.component */ "./src/app/components/app/app.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _root_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./root.routing.module */ "./src/app/root.routing.module.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _gaurds_app_gaurd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./gaurds/app.gaurd */ "./src/app/gaurds/app.gaurd.ts");










var RootModule = /** @class */ (function () {
    function RootModule() {
    }
    RootModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _root_routing_module__WEBPACK_IMPORTED_MODULE_7__["RootRoutingModule"]
            ],
            providers: [
                ngx_cookie_service__WEBPACK_IMPORTED_MODULE_8__["CookieService"],
                _gaurds_app_gaurd__WEBPACK_IMPORTED_MODULE_9__["AppGaurd"]
            ],
            bootstrap: [
                _components_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
            ]
        })
    ], RootModule);
    return RootModule;
}());



/***/ }),

/***/ "./src/app/root.routing.module.ts":
/*!****************************************!*\
  !*** ./src/app/root.routing.module.ts ***!
  \****************************************/
/*! exports provided: RootRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootRoutingModule", function() { return RootRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/app/app.component */ "./src/app/components/app/app.component.ts");
/* harmony import */ var _gaurds_app_gaurd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gaurds/app.gaurd */ "./src/app/gaurds/app.gaurd.ts");





var rootRoutes = [
    {
        path: 'authorized',
        component: _components_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        loadChildren: './editor-module.routing#EditorRoutingModule',
    },
    {
        path: '',
        loadChildren: './app.routing#AppRoutingModule',
        canActivate: [_gaurds_app_gaurd__WEBPACK_IMPORTED_MODULE_4__["AppGaurd"]]
    }
];
var RootRoutingModule = /** @class */ (function () {
    function RootRoutingModule() {
    }
    RootRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(rootRoutes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], RootRoutingModule);
    return RootRoutingModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_root_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/root.module */ "./src/app/root.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_root_module__WEBPACK_IMPORTED_MODULE_2__["RootModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\sivanagaraju\Desktop\MysamleProject\RMUTE\views\editor\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map