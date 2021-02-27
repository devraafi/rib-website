"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.TokenRestServices = void 0;
var aut_service_1 = require("services/auth/aut.service");
var request_services_1 = require("services/request.services");
var TokenRestServices = /** @class */ (function () {
    function TokenRestServices(baseUrl, useInterceptor, withoutInterceptor, auth) {
        if (withoutInterceptor === void 0) { withoutInterceptor = false; }
        if (auth === void 0) { auth = new aut_service_1.AuthenticationService; }
        this.requestService = new request_services_1.RequestService;
        this.urlDh = 'https://staging-lazis-dh.herokuapp.com';
        this.request = this.requestService["new"](this.urlDh, useInterceptor, withoutInterceptor);
    }
    TokenRestServices.prototype.refreshToken = function (refresh_token) {
        var payload = {
            client_id: 'lazis-dh',
            client_secret: 'L4Z1SDH',
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        };
        return this.request.post("/oauth2/connect/token", payload);
    };
    TokenRestServices.prototype.login = function (payload) {
        var client = {
            client_id: 'lazis-dh',
            client_secret: 'L4Z1SDH',
            grant_type: 'password'
        };
        var newPayload = __assign(__assign({}, payload), client);
        return this.request.post("/oauth2/connect/token", newPayload);
    };
    return TokenRestServices;
}());
exports.TokenRestServices = TokenRestServices;
