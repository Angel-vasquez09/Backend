import {Router} from 'express';
import { Cancion } from '../model/canciones.model';

const CancionesRoute = Router();

/* 
=============================================================
= OBTENER TODAS LAS CANCIONES DE LA BASE DE DATOS
=============================================================
*/
CancionesRoute.get('/', (req,res) => {
    
    let paginacion = Number(req.query.pagina) || 1;
    let skip = paginacion - 1;
    skip = skip * 10;

    const getCancion = Cancion  .find()
                                .sort({_id: -1})
                                .limit(10)
                                .skip(skip)
                                .then((resp: any) => {
        res.json({
            pagina: paginacion,
            cacniones: resp
        })
    })

    

});
/* 
=============================================================
= OBTENER CANCIONES POR ARTISTA
=============================================================
*/
CancionesRoute.get('/obtenerX', (req,res) => {

    const obtenerX = {
        nombre : req.body.nombre  || '',
        artista: req.body.artista || '',
        tipo   : req.body.tipo    || '',
    }

    var buscar = {};

    if (obtenerX.artista != '') {
        buscar = {artista: req.body.artista}  
    }else if(obtenerX.nombre != ''){
        buscar = {nombre: req.body.nombre}
    }else if(obtenerX.tipo != ''){
        buscar = {tipo: req.body.tipo}
    }else{
        buscar = {artista: '-12kdsa'} 
    }

    console.log(buscar);

    const getCancion = Cancion.find(buscar).exec().then((resp: any) => {
        
        res.json({
            cancion: resp
        })
        

    }).catch((err: any) => {
        res.json(err);
    })

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


CancionesRoute.post('/crear', (req,res) => {

    Cancion.create( req.body ).then(cancionBD => {
        
        res.json({
            error: false,
            cacion: cancionBD
        })

    })


});


export default CancionesRoute;