import Serve from "./class/serve";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import CancionesRoute from "./routes/canciones";

const serve = new Serve();

//Body parse
serve.app.use(bodyParser.urlencoded({extended: true}));
serve.app.use(bodyParser.json());

/* 
=========================================================
= RUTA CANCION
=========================================================
*/

serve.app.use('/canciones',CancionesRoute);

/* 
=========================================================
= NOS CONECTAMOS A LA BASE DE DATOS
=========================================================
*/
mongoose.connect('mongodb://localhost:27017/appIglesia',
        {useNewUrlParser: true, useCreateIndex: true},
        (err) => {
            // Si existe un error que no siga 
            if (err) throw err;

            // Si no ocurre un error tons
            console.log("Base de datos online");
        }
        );





/* 
=========================================================
= LEVANTAMOS EL SERVIDOR
=========================================================
*/
serve.start(()=>{
    console.log(`Servidor corriendo en puerto ${serve.port}`);
})