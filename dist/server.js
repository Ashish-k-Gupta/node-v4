"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(function (req, res, next) {
    req.shh_secret = 'doggy';
    next();
});
app.get('/', function (req, res) {
    res.send("Hello, TypeScript with Express");
    console.log('Hello from express');
    res.status(200);
});
app.use('/api', auth_1.protect, router_1["default"]);
exports["default"] = app;
//# sourceMappingURL=server.js.map