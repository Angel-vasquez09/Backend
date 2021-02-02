"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listCanciones_model_1 = require("../model/listCanciones.model");
const ListCancionesRoute = express_1.Router();
/*
=============================================================
= CREAR UNA LISTA DE CANCIONES
=============================================================
*/
ListCancionesRoute.post('/', (req, res) => {
    listCanciones_model_1.ListCancion.create(req.body).then(cancionBD => {
        res.json({
            ok: true,
            caciones: cancionBD
        });
    });
});
/*
=============================================================
= ELIMINAR LISTA
=============================================================
*/
ListCancionesRoute.post('/delete', (req, res) => {
    listCanciones_model_1.ListCancion.findByIdAndDelete(req.query.id, null, (err, cancionBD) => {
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
/*
=============================================================
= OBTENER LISTA DE CANCIONES POR FECHA
=============================================================
*/
ListCancionesRoute.get('/', (req, res) => {
    let paginacion = Number(req.query.pagina) || 1;
    let skip = paginacion - 1;
    skip = skip * 10;
    const getCancion = listCanciones_model_1.ListCancion.find()
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
exports.default = ListCancionesRoute;
