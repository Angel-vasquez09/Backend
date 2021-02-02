"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCancion = void 0;
const mongoose_1 = require("mongoose");
const listCancionShema = new mongoose_1.Schema({
    canciones: [{
            type: Object
        }],
    fechaCanto: {
        type: Date
    }
});
exports.ListCancion = mongoose_1.model('ListCancion', listCancionShema);
