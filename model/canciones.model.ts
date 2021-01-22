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
        type: String
    },
    artista: {
        type: String,
        required: [true,'artista obligatorio']
    },
    tipo: {
        type: String
    },
    created: {
        type: Date
    }
})

cancionShema.pre<Icancion>('save', function (next) {
    this.created = new Date();
    next();
})

interface Icancion extends Document {
    artista: string;
    created: Date;
    nombre : string;
    letra  : string;
    tipo   : string;
    img    : string;
}

export const Cancion = model<Icancion>('Cancion',cancionShema);