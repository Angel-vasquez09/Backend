import {Schema, model, Document} from 'mongoose';

const cancionShema = new Schema({

    nombre: {
        type: String,
        required: [true, 'nombre obligatorio']
    },
    img:{
        type: String,
        default: ''
    },
    letra:{
        type: String,
        required: [true, 'letra obligatorio']
    },
    artista: {
        type: String,
        required: [true,'artista obligatorio']
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
})

cancionShema.pre<Icancion>('save', function (next) {
    this.created = new Date();
    next();
})

interface Icancion extends Document {
    artista     : string;
    ultimaFecha? : Date;
    created     : Date;
    nombre      : string;
    letra       : string;
    tipo        : string;
    img         : string;

}

export const Cancion = model<Icancion>('Cancion',cancionShema);