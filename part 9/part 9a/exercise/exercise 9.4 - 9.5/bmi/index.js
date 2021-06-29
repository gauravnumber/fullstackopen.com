"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = express_1["default"]();
app.get('/', function (_req, res) {
    res.send('expre');
});
app.listen(3002, function () {
    console.log('App listening in 3002');
});
