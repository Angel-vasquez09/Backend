"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cancion = void 0;
const mongoose_1 = require("mongoose");
const cancionShema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'nombre obligatorio']
    },
    img: {
        type: String,
        default: ''
    },
    letra: {
        type: String,
        required: [true, 'letra obligatorio']
    },
    artista: {
        type: String,
        required: [true, 'artista obligatorio']
    },
    tipo: {
        type: String,
        required: [true, 'tipo obligatorio']
    },
    created: {
        type: Date
    },
    ultimaFecha: {
        type: Date
    }
});
cancionShema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Cancion = mongoose_1.model('Cancion', cancionShema);
