"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serve_1 = __importDefault(require("./class/serve"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const canciones_1 = __importDefault(require("./routes/canciones"));
const serve = new serve_1.default();
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
mongoose_1.default.connect('mongodb://localhost:27017/appIglesia', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
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
serve.start(() => {
    console.log(`Corriendo en puerto ${serve.port}`);
});
