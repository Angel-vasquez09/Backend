"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const canciones_model_1 = require("../model/canciones.model");
const CancionesRoute = express_1.Router();
/*
=============================================================
= OBTENER TODAS LAS CANCIONES DE LA BASE DE DATOS
=============================================================
*/
CancionesRoute.get('/', (req, res) => {
    let paginacion = Number(req.query.pagina) || 1;
    let skip = paginacion - 1;
    skip = skip * 10;
    const getCancion = canciones_model_1.Cancion.find()
        .sort({ _id: -1 })
        .limit(10)
        .skip(skip)
        .then((resp) => {
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
CancionesRoute.get('/obtener/:key/:valor', (req, res) => {
    const key = req.params.key;
    const valor = req.params.valor;
    var buscar = {};
    if (key === 'artista') {
        buscar = { artista: valor };
    }
    else if (key === 'nombre') {
        buscar = { nombre: valor };
    }
    else if (key === 'tipo') {
        buscar = { tipo: valor };
    }
    else {
        buscar = { artista: '-12kdsa' };
    }
    console.log(buscar);
    const getCancion = canciones_model_1.Cancion.find(buscar).exec().then((resp) => {
        res.json({
            cancion: resp
        });
    }).catch((err) => {
        res.json(err);
    });
});
/*
=============================================================
= GUARDAR CANCION EN LA BASE DE DATOS
=============================================================
*/
CancionesRoute.post('/crear', (req, res) => {
    canciones_model_1.Cancion.create(req.body).then(cancionBD => {
        res.json({
            error: false,
            cacion: cancionBD
        });
    });
});
/*
=============================================================
= ACTUALIZAR CANCION
=============================================================
*/
CancionesRoute.post('/update', (req, res) => {
    const cancion = {
        artista: req.body.artista,
        nombre: req.body.nombre,
        letra: req.body.letra,
        tipo: req.body.tipo
    };
    canciones_model_1.Cancion.findByIdAndUpdate(req.body.id, cancion, { new: true }, (err, cancionBD) => {
        if (err)
            throw err + 'false';
        if (!cancionBD) {
            return res.json({
                ok: false,
                mensaje: 'Id de la cancion no encontrado'
            });
        }
        res.json({
            ok: true,
            resp: cancionBD
        });
    });
});
/*
=============================================================
= ELIMINAR CANCION
=============================================================
*/
CancionesRoute.post('/delete', (req, res) => {
    canciones_model_1.Cancion.findByIdAndDelete(req.body.id, null, (err, cancionBD) => {
        if (err)
            throw err + 'false';
        if (!cancionBD) {
            return res.json({
                ok: false,
                mensaje: 'Id de la cancion no encontrado'
            });
        }
        res.json({
            ok: true,
            resp: 'Eliminado'
        });
    });
});
exports.default = CancionesRoute;
