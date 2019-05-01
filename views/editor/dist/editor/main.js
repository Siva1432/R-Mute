(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "textarea{\r\n    width:70%;\r\n    height:600px;\r\n    background-color: black;\r\n    color:white;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFNBQVM7SUFDVCxZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLFdBQVc7QUFDZiIsImZpbGUiOiJhcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0ZXh0YXJlYXtcclxuICAgIHdpZHRoOjcwJTtcclxuICAgIGhlaWdodDo2MDBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>Welcome to the realtime online multiuser editor</h1>\n  <textarea #editor [(ngModel)] = \"text\" (keydown)=\"deleteVal($event,editor)\" (keypress)=\"updateText($event,editor)\"></textarea>\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/socket.service */ "./src/app/services/socket.service.ts");
/* harmony import */ var _services_text_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/text.service */ "./src/app/services/text.service.ts");



//import { nextContext } from '@angular/core/src/render3';

var AppComponent = /** @class */ (function () {
    function AppComponent(socketService, txtss) {
        this.socketService = socketService;
        this.txtss = txtss;
        this.title = 'editor';
        this.concatText = function (_a) {
            var val = _a.val, index = _a.index, key = _a.key;
            console.log("got index ", index, val);
            if (key == "d") {
                switch (index) {
                    case 0:
                        this.text = this.text.slice(0);
                    default:
                        this.text = "" + this.text.slice(0, index) + this.text.slice(index + 1);
                }
            }
            else {
                if (index == 0) {
                    this.text = "" + val + this.text;
                }
                else {
                    this.text = "" + this.text.slice(0, index) + val + this.text.slice(index);
                }
            }
        };
        this.updateText = function (event, editor) {
            var op;
            var fn;
            var key;
            console.log("event key:", event);
            if (event.key == "Enter") {
                key = "\n";
                console.log("insert line break key:" + key);
            }
            else {
                key = event.key;
            }
            ;
            op = { key: key, index: editor.selectionStart, fn: fn };
            this.txtss.newKey(op);
        };
        this.deleteVal = function (event, editor) {
            console.log("" + event.key);
            if (event.key == "Delete" || event.key == "Backspace") {
                console.log("got " + event.key + " event at index " + editor.selectionStart);
                this.txtss.deleteValEmit({ key: event.key, index: editor.selectionStart, textLength: this.text.length });
            }
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.socketService.connect();
        this.socketService.getText();
        this.socketService.emitgetUserParams();
        this.socketService.observeServerText.subscribe();
        this.socketService.getServerText
            .subscribe(function (value) {
            _this.text = value.text;
            _this.idString = value.idString;
        });
        this.txtss.mutateText.subscribe(function (val) {
            _this.concatText(val);
        });
    };
    ;
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"], _services_text_service__WEBPACK_IMPORTED_MODULE_3__["TextService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _services_socket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/socket.service */ "./src/app/services/socket.service.ts");
/* harmony import */ var _services_text_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/text.service */ "./src/app/services/text.service.ts");
/* harmony import */ var _services_operation_helpers_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/operation-helpers.service */ "./src/app/services/operation-helpers.service.ts");







//import {FormsModule} from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            ],
            providers: [_services_socket_service__WEBPACK_IMPORTED_MODULE_4__["SocketService"], _services_text_service__WEBPACK_IMPORTED_MODULE_5__["TextService"], _services_operation_helpers_service__WEBPACK_IMPORTED_MODULE_6__["OperationHelpersService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/services/operation-helpers.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/operation-helpers.service.ts ***!
  \*******************************************************/
/*! exports provided: OperationHelpersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperationHelpersService", function() { return OperationHelpersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OperationHelpersService = /** @class */ (function () {
    function OperationHelpersService() {
    }
    OperationHelpersService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OperationHelpersService);
    return OperationHelpersService;
}());



/***/ }),

/***/ "./src/app/services/socket.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/socket.service.ts ***!
  \********************************************/
/*! exports provided: SocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketService", function() { return SocketService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var SocketService = /** @class */ (function () {
    function SocketService() {
        var _this = this;
        this.getServerText = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.observeServerText = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (Observer) {
            _this.socket.on('getText', function (val) {
                console.log("got text properties from server :", val);
                _this.getServerText.next(val);
                _this.getServerText.complete();
                Observer.complete();
            });
        });
        this.newOp = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (Observer) {
            _this.socket.on("newOp", function (op) {
                Observer.next(op);
                //  console.log(`got new Op:`,op);
            });
        });
        this.deleteValListner = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (Observer) {
            _this.socket.on("deleteVal", function (id) {
                Observer.next(id);
                console.log("got delete value at index::" + id);
            });
        });
        this.getUserParams = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (Observer) {
            _this.socket.on('getUserParams', function (data) {
                Observer.next(data);
                Observer.complete();
            });
        });
        this.deleteVal = function (nextTo) {
            this.socket.emit("deleteVal", nextTo);
        };
        this.emitNewOp = function (op) {
            this.socket.emit('newOperation', op);
        };
        this.emitgetUserParams = function () {
            this.socket.emit('getUserParams');
        };
        this.getText = function () {
            this.socket.emit('getText');
        };
        var url = { local: "http://localhost:4500/editor", heroku: "'https://rmute.herokuapp.com/editor'" };
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2__["connect"](url.local);
        this.socket.on('connection', function () {
            console.log('io connection established', _this.socket.nsp);
        });
    }
    SocketService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SocketService);
    return SocketService;
}());



/***/ }),

/***/ "./src/app/services/text.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/text.service.ts ***!
  \******************************************/
/*! exports provided: TextService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextService", function() { return TextService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.service */ "./src/app/services/socket.service.ts");




var TextService = /** @class */ (function () {
    function TextService(socketService) {
        var _this = this;
        this.socketService = socketService;
        this.idString = '';
        this.findNextTo = function (index) {
            var nextTo;
            var idStr = this.idString;
            if (index <= 0) {
                nextTo = 0;
            }
            else {
                (idStr.length == 0) ? nextTo = 0 : nextTo = idStr.split(',')[index - 1];
                console.log("new val at index::" + index + " nextTo::" + nextTo + " idStr::" + idStr.split(","));
            }
            return nextTo;
        };
        this.mutateText = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.compareId = function (id, next) {
            if (id.length > next.length) {
                console.log("id is greater then next");
                return true;
            }
            else if (id.length == next.length) {
                if (id > next) {
                    console.log("id > next");
                    return true;
                }
                else {
                    console.log("id < next");
                    return false;
                }
            }
            else {
                console.log("id < next");
                return false;
            }
            ;
        };
        this.addId = function (op, id) {
            if (id == NaN || id == undefined) {
                id = op.c + op.id;
            }
            var newNextTo;
            var idArry = this.idString.split(",");
            console.log("idArry :" + idArry);
            if (this.idString.length > 0 && op.nextTo !== 0) {
                for (var i = idArry.indexOf(op.nextTo) + 1; i < idArry.length; i++) {
                    if (this.compareId(id, idArry[i])) {
                        newNextTo = idArry[i - 1];
                        console.log("newNextTo :" + id + " > " + newNextTo + " original nextTo:" + op.nextTo);
                        break;
                    }
                    ;
                }
                ;
            }
            ;
            if (newNextTo == undefined) {
                switch (this.idString.length) {
                    case 0:
                        newNextTo = 0;
                        break;
                    default:
                        (op.nextTo == 0) ? newNextTo = 0 : newNextTo = idArry[idArry.length - 1];
                }
            }
            // console.log(`apending id :${id}`);
            var nextIndex = this.idString.indexOf(newNextTo);
            var n = newNextTo.length;
            //console.log( `nextTo:${op.nextTo}    next index: ${nextIndex}  `);
            console.log("newNextTo :" + newNextTo);
            switch (newNextTo) {
                case 0:
                    (this.idString.length >= 1) ? this.idString = id + "," + this.idString : this.idString = "" + id;
                    break;
                default:
                    if (nextIndex >= 0) {
                        this.idString = this.idString.slice(0, nextIndex + n) + "," + id + this.idString.slice(nextIndex + n);
                    }
            }
            ;
            return newNextTo;
        };
        this.newOpeartion = this.socketService.newOp.subscribe(function (op) {
            //console.log(`local counter:${this.userParams.counter} , Op counter:${op.c}`);
            (_this.userParams.counter < op.c) ? _this.userParams.counter = op.c : console.log("got op coutner less then local");
            var newNextTo = _this.addId(op);
            //console.log(`newOp Received val at index:`,index,op,this.idString);
            var index = _this.idString.split(",").indexOf(newNextTo);
            if (index >= -1) {
                var concat = { val: op.val, index: index + 1, key: 'i' };
                _this.mutateText.next(concat);
            }
        });
        this.newKey = function (op) {
            var operation;
            this.userParams.counter++;
            var id = this.userParams.counter + this.userParams.id;
            op.nextTo = this.findNextTo(op.index);
            if (op.nextTo !== undefined) {
                this.addId(op, id);
                operation = { id: this.userParams.id,
                    c: this.userParams.counter,
                    fn: 'i',
                    val: op.key,
                    nextTo: op.nextTo
                };
                //console.log('new Op created :',op,op.nextTo);
                this.socketService.emitNewOp(operation);
            }
            else {
                // console.log(`got next to undefined, event ${op.val} at index${op.index} not updated`);
            }
        };
        this.deleteValEmit = function (fn) {
            var nextTo;
            var removeNextIndex;
            switch (fn.key) {
                case "Backspace":
                    removeNextIndex = fn.index;
                    (fn.index >= 1) ? nextTo = this.findNextTo(removeNextIndex) : removeNextIndex = undefined;
                    break;
                case "Delete":
                    removeNextIndex = fn.index + 1;
                    (fn.index < fn.textLength) ? nextTo = this.findNextTo(removeNextIndex) : removeNextIndex = undefined;
                    break;
            }
            console.log("delete val from " + removeNextIndex);
            if (removeNextIndex !== undefined && nextTo !== undefined) {
                var indexOfNextTo = this.idString.indexOf(nextTo);
                var n = nextTo.length;
                var idStr = this.idString;
                switch (indexOfNextTo) {
                    case 0:
                        this.idString = idStr.slice(indexOfNextTo + n + 1);
                        break;
                    default:
                        this.idString = idStr.slice(0, indexOfNextTo - 1) + idStr.slice(indexOfNextTo + n);
                }
                console.log("removed id " + nextTo + " IndexOfNextTo:" + indexOfNextTo + " idLength:" + n + " now idStr:" + this.idString + " ");
                this.socketService.deleteVal(nextTo);
            }
        };
        this.deleteVal = this.socketService.deleteValListner.subscribe(function (id) {
            var index = _this.idString.split(",").indexOf(id);
            var indexOfNextTo = _this.idString.indexOf(id);
            var n = id.length;
            var idStr = _this.idString;
            switch (indexOfNextTo) {
                case 0:
                    _this.idString = idStr.slice(id.length + 1);
                    break;
                default:
                    _this.idString = idStr.slice(0, indexOfNextTo - 1) + idStr.slice(indexOfNextTo + n);
            }
            console.log("removed id " + indexOfNextTo + " idLength:" + n + ", now idStr:" + _this.idString + " ");
            if (index >= -1) {
                var remove = { val: "", index: index, key: 'd' };
                _this.mutateText.next(remove);
            }
        });
        this.socketService.getUserParams.subscribe(function (val) {
            _this.userParams = val;
            console.log("got the UserParams :", _this.userParams);
        });
        this.socketService.getServerText
            .subscribe(function (value) {
            _this.idString = value.idString;
            //console.log('IdStr',this.idString);
        });
    }
    ;
    TextService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], TextService);
    return TextService;
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
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\sivanagaraju\Desktop\MysamleProject\RMUTE\views\editor\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map