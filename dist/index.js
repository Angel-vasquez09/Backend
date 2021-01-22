"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serve_1 = __importDefault(require("./class/serve"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var canciones_1 = __importDefault(require("./routes/canciones"));
var serve = new serve_1.default();
//Body parse
serve.app.use(body_parser_1.default.urlencoded({ extended: true }));
serve.app.use(body_parser_1.default.json());
/*
=========================================================
= RUTA CANCION
=========================================================
*/
serve.app.use('/canciones', canciones_1.default);
/*
=========================================================
= NOS CONECTAMOS A LA BASE DE DATOS
=========================================================
*/
mongoose_1.default.connect('mongodb://localhost:27017/appIglesia', { useNewUrlParser: true, useCreateIndex: true }, function (err) {
    // Si existe un error que no siga 
    if (err)
        throw err;
    // Si no ocurre un error tons
    console.log("Base de datos online");
});
/*
=========================================================
= LEVANTAMOS EL SERVIDOR
=========================================================
*/
serve.start(function () {
    console.log("Servidor corriendo en puerto " + serve.port);
});
