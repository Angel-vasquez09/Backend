import {Schema, model, Document} from 'mongoose';

const listCancionShema = new Schema({

    canciones: [{
        type: Object
    }],
    fechaCanto: {
        type: Date
    }
})



interface Ilist extends Document {
    fechaCanto: Date;
    cancion: object[];

}

export const ListCancion = model<Ilist>('ListCancion',listCancionShema);