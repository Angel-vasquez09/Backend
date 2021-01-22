"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Serve = /** @class */ (function () {
    function Serve() {
        this.port = 3000;
        // Inicializamos la variable para que no marque error
        this.app = express_1.default();
    }
    //Funcion para escuchar al servidor mediante el puerto
    Serve.prototype.start = function (calback) {
        this.app.listen(this.port, calback);
    };
    return Serve;
}());
exports.default = Serve;
