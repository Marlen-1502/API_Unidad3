const express = require('express');
const asyncHandler = require('express-async-handler');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/Tempe.js');

mongoose.connect('mongodb://localhost:27017/api-tempe',{ 'useNewUrlParser': true, 'useUnifiedTopology': true }, (err) => {
	if (err) throw err;
});
console.log('conexion exitosa');


app.set('port', process.env.PORT || 3003);
app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'), () =>{
	console.log(`Server on port ${app.get('port')}`);
});



//metodo GET encargado en consultar todos los registros de la base de datos
app.get('GET /api-tempe/temperatura-corporal/datos',asyncHandler(async (req,res,next) => {
	const f = await Tempe.find({}, (err) => {
		if(err) throw (err); 
	});
	res.json(f);
}));


//metodo POST encargado de insertar nuevos registros a la base de datos
app.post('api-tempe/temperatura-corporal/datos',asyncHandler(async (req,res,next) => {
	console.log('api-tempe/temperatura-corpora');
	console.log(req.body);

	

	await inter.save((err, inter1) =>{
		if(err) throw err;

		res.send({inter: inter1});
	});
}));