import  Serve  from './class/serve';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import CancionesRoute from "./routes/canciones";
import cors from 'cors';
import ListCancionesRoute from "./routes/listCanciones"

const serve = new Serve();



//Body parse
serve.app.use(bodyParser.urlencoded({extended: true}));
serve.app.use(bodyParser.json());

// Cords
serve.app.use(cors({ origin: true, credentials: true  }));



/* 
=========================================================
= RUTA CANCION
=========================================================
*/
serve.app.use('/canciones',CancionesRoute);

/* 
=========================================================
= RUTA DE LISTA DE CANCIONES
=========================================================
*/
serve.app.use('/listC',ListCancionesRoute);

/* 
=========================================================
= NOS CONECTAMOS A LA BASE DE DATOS
=========================================================
*/
mongoose.connect('mongodb://localhost:27017/appIglesia',
        {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
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
    console.log(`Corriendo en puerto ${ serve.port }`);
});