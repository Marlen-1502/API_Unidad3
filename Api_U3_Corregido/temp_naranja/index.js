const express = require('express');
const asyncHandler = require('express-async-handler');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Temperatura = require('./db/tempNaranja_db.js');

mongoose.connect('mongodb://localhost:27017/temper_naranja', { 'useNewUrlParser': true, 'useUnifiedTopology': true }, (err) => {
    if (err) {
        console.log('Error con la conexion de la base de datos');
    }
    else
        console.log('Conexion exitosa a la base de datos');
});

app.set('port', process.env.PORT || 3005);
app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
    console.log(`Server corriendo en el puerto ${app.get('port')}`);
});

app.post('/agregarTemperatura', asyncHandler( async (req,res,next) => {
    console.log('Post /proyecto/agregarTemperatura');
    console.log(req.body);
    var temp = new Temperatura();

    temp.NoCo = await req.body.NoCo;
    temp.Temperatura = await req.body.Temperatura;

    temp.save((err, temp_naranja) => {
        if (err) 
            res.json({'R':500});
            
            res.status(200).send({temp: temp_naranja});
    });
}));

app.post('/obtenerTemperatura', asyncHandler(async (req,res,next) => {
    var Selector = req.body.Selector;
    var fi = req.body.fi;
    var ff = req.body.ff;

        if(Selector == "Completa") {
            Temperatura.find({}, "NoCo Temperatura", function(err, temp_naranja) {
                if(err) {
                    res.json({'R':500});
                }else{
                    res.json({'R':200, 'D':temp_naranja});
                }     
            });
        }
        else if(Selector == "Rango") {
            Temperatura.find({Date:{
                $gte: new Date(fi),
                $lt: new Date(ff)
            }}, function(err, temp_naranja) {
                if(err) {
                    res.json({'R':500});
                }else{
                    res.json({'R':200, 'D':temp_naranja});
                }
            });
        }
        else{
            res.json({'R':400});
        }
}));