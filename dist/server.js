"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var routes_1 = require("./routes");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var v1Routes = (0, routes_1.v1)();
app.use('/api/v1', v1Routes);
app.listen(3333, function () { return 'server running on port 3333'; });
