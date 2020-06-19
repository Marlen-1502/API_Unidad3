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
    console.log('Post /agregarTemperatura');
    console.log(req.body);
    var tem = new Temperatura();

    tem.NoCo = await req.body.NoCo;
    tem.Temp = await req.body.Temp;

    tem.save((err, temp_naranja) => {
        if (err) 
            res.json({'R':500});
            
            res.status(200).send({tem: temp_naranja});
    });
}));

app.post('/obtenerTemperatura', asyncHandler(async (req,res,next) => {
    var Tipo = req.body.Tipo;
    var FI = req.body.FI;
    var FF = req.body.FF;

        if(Tipo == "Completa") {
            Temperatura.find({}, "NoCo Temp", function(err, temp_naranja) {
                if(err) {
                    res.json({'R':500});
                }else{
                    res.json({'R':200, 'D':temp_naranja});
                }     
            });
        }
        else if(Tipo == "Rango") {
            Temperatura.find({Date:{
                $gte: new Date(FI),
                $lt: new Date(FF)
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