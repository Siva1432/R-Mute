(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/ngx-cookie-service/cookie-service/cookie.service.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ngx-cookie-service/cookie-service/cookie.service.js ***!
  \**************************************************************************/
/*! exports provided: CookieService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieService", function() { return CookieService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
// This service is based on the `ng2-cookies` package which sadly is not a service and does
// not use `DOCUMENT` injection and therefore doesn't work well with AoT production builds.
// Package: https://github.com/BCJTI/ng2-cookies


var CookieService = (function () {
    function CookieService(
        // The type `Document` may not be used here. Although a fix is on its way,
        // we will go with `any` for now to support Angular 2.4.x projects.
        // Issue: https://github.com/angular/angular/issues/12631
        // Fix: https://github.com/angular/angular/pull/14894
        document, 
        // Get the `PLATFORM_ID` so we can check if we're in a browser.
        platformId) {
        this.document = document;
        this.platformId = platformId;
        this.documentIsAccessible = Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this.platformId);
    }
    /**
     * @param name Cookie name
     * @returns {boolean}
     */
    CookieService.prototype.check = function (name) {
        if (!this.documentIsAccessible) {
            return false;
        }
        name = encodeURIComponent(name);
        var regExp = this.getCookieRegExp(name);
        var exists = regExp.test(this.document.cookie);
        return exists;
    };
    /**
     * @param name Cookie name
     * @returns {any}
     */
    CookieService.prototype.get = function (name) {
        if (this.documentIsAccessible && this.check(name)) {
            name = encodeURIComponent(name);
            var regExp = this.getCookieRegExp(name);
            var result = regExp.exec(this.document.cookie);
            return decodeURIComponent(result[1]);
        }
        else {
            return '';
        }
    };
    /**
     * @returns {}
     */
    CookieService.prototype.getAll = function () {
        if (!this.documentIsAccessible) {
            return {};
        }
        var cookies = {};
        var document = this.document;
        if (document.cookie && document.cookie !== '') {
            var split = document.cookie.split(';');
            for (var i = 0; i < split.length; i += 1) {
                var currentCookie = split[i].split('=');
                currentCookie[0] = currentCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currentCookie[0])] = decodeURIComponent(currentCookie[1]);
            }
        }
        return cookies;
    };
    /**
     * @param name     Cookie name
     * @param value    Cookie value
     * @param expires  Number of days until the cookies expires or an actual `Date`
     * @param path     Cookie path
     * @param domain   Cookie domain
     * @param secure   Secure flag
     * @param sameSite OWASP samesite token `Lax` or `Strict`
     */
    CookieService.prototype.set = function (name, value, expires, path, domain, secure, sameSite) {
        if (!this.documentIsAccessible) {
            return;
        }
        var cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                var dateExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                cookieString += 'expires=' + dateExpires.toUTCString() + ';';
            }
            else {
                cookieString += 'expires=' + expires.toUTCString() + ';';
            }
        }
        if (path) {
            cookieString += 'path=' + path + ';';
        }
        if (domain) {
            cookieString += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieString += 'secure;';
        }
        if (sameSite) {
            cookieString += 'sameSite=' + sameSite + ';';
        }
        this.document.cookie = cookieString;
    };
    /**
     * @param name   Cookie name
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    CookieService.prototype.delete = function (name, path, domain) {
        if (!this.documentIsAccessible) {
            return;
        }
        this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain);
    };
    /**
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    CookieService.prototype.deleteAll = function (path, domain) {
        if (!this.documentIsAccessible) {
            return;
        }
        var cookies = this.getAll();
        for (var cookieName in cookies) {
            if (cookies.hasOwnProperty(cookieName)) {
                this.delete(cookieName, path, domain);
            }
        }
    };
    /**
     * @param name Cookie name
     * @returns {RegExp}
     */
    CookieService.prototype.getCookieRegExp = function (name) {
        var escapedName = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/ig, '\\$1');
        return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
    };
    return CookieService;
}());

CookieService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/** @nocollapse */
CookieService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] },] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] },] },
]; };
//# sourceMappingURL=cookie.service.js.map

/***/ }),

/***/ "./node_modules/ngx-cookie-service/index.js":
/*!**************************************************!*\
  !*** ./node_modules/ngx-cookie-service/index.js ***!
  \**************************************************/
/*! exports provided: CookieService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cookie_service_cookie_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie-service/cookie.service */ "./node_modules/ngx-cookie-service/cookie-service/cookie.service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CookieService", function() { return _cookie_service_cookie_service__WEBPACK_IMPORTED_MODULE_0__["CookieService"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");






var HttpService = /** @class */ (function () {
    function HttpService(http, router, cs) {
        this.http = http;
        this.router = router;
        this.cs = cs;
        this.getUser = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]({ id: '', firstname: '', lastname: '', email: '', collaborations: [], projects: [] });
        this.submitLogin = function (credentials) {
            var _this = this;
            this.http.post("http://localhost:4500/authenticate/login", credentials).subscribe(function (val) {
                console.log("got response from server", val);
                _this.User = val;
                _this.router.navigate(['/authorized/dashboard', val.id]);
                _this.getUser.next(val);
            });
        };
        this.submitSignUp = function (credentials) {
            var _this = this;
            this.http.post("http://localhost:4500/authenticate/signup", credentials).subscribe(function (val) {
                console.log("got response from server", val);
                _this.User = val;
                _this.router.navigate(['/authorized/dashboard', val.id]);
                _this.getUser.next(val);
            });
        };
        this.logout = function (id) {
            var _this = this;
            var returnVal;
            this.http.post("http://localhost:4500/authenticate/logout", { id: id }).subscribe(function (val) {
                console.log("got result from logout route", val);
                _this.router.navigate(['/login']);
                console.log('remaining cookies', _this.cs.getAll());
            });
        };
    }
    HttpService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__["CookieService"]])
    ], HttpService);
    return HttpService;
}());



/***/ }),

/***/ "./src/app/services/paths.ts":
/*!***********************************!*\
  !*** ./src/app/services/paths.ts ***!
  \***********************************/
/*! exports provided: Paths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Paths", function() { return Paths; });
var Paths = /** @class */ (function () {
    function Paths() {
        this.origin = 'http://localhost:4500/authorize';
        this.endPoints = {
            isValid: this.origin + '/isvalid',
            getRole: this.origin + '/role'
        };
    }
    return Paths;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map