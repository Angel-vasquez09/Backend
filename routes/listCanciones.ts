import {Router} from 'express';
import { ListCancion } from '../model/listCanciones.model';

const ListCancionesRoute = Router();

/* 
=============================================================
= CREAR UNA LISTA DE CANCIONES
=============================================================
*/
ListCancionesRoute.post('/',(req,res) => {

    ListCancion.create( req.body ).then(cancionBD => {
        
        res.json({
            ok: true,
            caciones: cancionBD
        })

    })
})



/* 
=============================================================
= ELIMINAR LISTA
=============================================================
*/
ListCancionesRoute.post('/delete', (req,res) => {


    ListCancion.findByIdAndDelete(req.query.id,null,(err,cancionBD)=>{
        
        if(err) throw err + 'false';

        if (!cancionBD) {
            
            return res.json({
                ok:false,
                mensaje: 'Id de la cancion no encontrado'
            })
        }
        

        res.json({
            ok: true,
            resp: 'Eliminado'
        })
    })
})





/* 
=============================================================
= OBTENER LISTA DE CANCIONES POR FECHA
=============================================================
*/
ListCancionesRoute.get('/',(req,res) => {

    let paginacion = Number(req.query.pagina) || 1;
    let skip = paginacion - 1;
    skip = skip * 10;

    const getCancion = ListCancion  .find()
                                    .sort({_id: -1})
                                    .limit(10)
                                    .skip(skip)
                                    .then((resp: any) => {
        res.json({
            pagina: paginacion,
            cacniones: resp
        })
    })
})




export default ListCancionesRoute;