"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var canciones_model_1 = require("../model/canciones.model");
var CancionesRoute = express_1.Router();
/*
=============================================================
= OBTENER TODAS LAS CANCIONES DE LA BASE DE DATOS
=============================================================
*/
CancionesRoute.get('/', function (req, res) {
    var paginacion = Number(req.query.pagina) || 1;
    var skip = paginacion - 1;
    skip = skip * 10;
    var getCancion = canciones_model_1.Cancion.find()
        .sort({ _id: -1 })
        .limit(10)
        .skip(skip)
        .then(function (resp) {
        res.json({
            pagina: paginacion,
            cacniones: resp
        });
    });
});
/*
=============================================================
= OBTENER CANCIONES POR ARTISTA
=============================================================
*/
CancionesRoute.get('/obtenerX', function (req, res) {
    var obtenerX = {
        nombre: req.body.nombre || '',
        artista: req.body.artista || '',
        tipo: req.body.tipo || '',
    };
    var buscar = {};
    if (obtenerX.artista != '') {
        buscar = { artista: req.body.artista };
    }
    else if (obtenerX.nombre != '') {
        buscar = { nombre: req.body.nombre };
    }
    else if (obtenerX.tipo != '') {
        buscar = { tipo: req.body.tipo };
    }
    else {
        buscar = { artista: '-12kdsa' };
    }
    console.log(buscar);
    var getCancion = canciones_model_1.Cancion.find(buscar).exec().then(function (resp) {
        res.json({
            cancion: resp
        });
    }).catch(function (err) {
        res.json(err);
    });
    /*
    Esto es lo que colocaras en el servidor
    x = artista, nombre, tipo
    obtenerCancionPor(x,dato){
        const buscar = {
            x: dato
        }
        return this.http.get('localhost:3000/canciones/obtenerX',buscar);
    }
    */
});
/*
=============================================================
= GUARDAR CANCION EN LA BASE DE DATOS
=============================================================
*/
CancionesRoute.post('/crear', function (req, res) {
    canciones_model_1.Cancion.create(req.body).then(function (cancionBD) {
        res.json({
            error: false,
            cacion: cancionBD
        });
    });
});
exports.default = CancionesRoute;
