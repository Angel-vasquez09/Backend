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

serve.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




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
mongoose.connect('mongodb+srv://root:1234@cluster0.h8qkm.mongodb.net/appIglesia?retryWrites=true&w=majority',
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