"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.protect = exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createToken = function (user) {
    var token = jsonwebtoken_1["default"].sign({
        id: user.id,
        name: user.name
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
exports.createToken = createToken;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    console.log(bearer);
    if (!bearer) {
        res.status(401);
        res.json({ message: 'not authorized' });
        return;
    }
    var _a = bearer.split(' '), token = _a[1];
    if (!token) {
        res.status(401);
        res.json({ message: 'Not a valid token' });
        return;
    }
    try {
        var user = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(401);
        res.json({ message: 'not valid token' });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map