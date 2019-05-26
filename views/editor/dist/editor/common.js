(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

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
        this.origin = 'http://localhost:4500/';
        this.endPoints = {
            isValid: this.origin + 'authorize/isvalid',
            getRole: this.origin + 'authorize/role',
            getUser: this.origin + 'authorize/getuser',
            logOut: this.origin + 'authenticate/logout'
        };
    }
    return Paths;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map