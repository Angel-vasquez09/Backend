"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const chatShema = new mongoose_1.Schema({
    nombre: {
        type: String
    },
    mensaje: {
        type: String
    },
    created: {
        type: Date,
        default: new Date()
    },
    usuarioId: {
        type: String
    },
    amigoId: {
        type: String
    }
});
exports.Chat = mongoose_1.model('Chat', chatShema);
