"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serve_1 = __importDefault(require("./class/serve"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const canciones_1 = __importDefault(require("./routes/canciones"));
const cors_1 = __importDefault(require("cors"));
const listCanciones_1 = __importDefault(require("./routes/listCanciones"));
const serve = new serve_1.default();
//Body parse
serve.app.use(body_parser_1.default.urlencoded({ extended: true }));
serve.app.use(body_parser_1.default.json());
// Cords
serve.app.use(cors_1.default({ origin: true, credentials: true }));
serve.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
/*
=========================================================
= RUTA CANCION
=========================================================
*/
serve.app.use('/canciones', canciones_1.default);
/*
=========================================================
= RUTA DE LISTA DE CANCIONES
=========================================================
*/
serve.app.use('/listC', listCanciones_1.default);
/*
=========================================================
= NOS CONECTAMOS A LA BASE DE DATOS
=========================================================
*/
mongoose_1.default.connect('mongodb+srv://root:1234@cluster0.h8qkm.mongodb.net/appIglesia?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
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
