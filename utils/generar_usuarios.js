const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');

mongoose.connect('mongodb://mymongodb/playrest_v3');

Usuario.collection.drop();

let usu1 = new Usuario({
 login: 'Rocio_a_donde_Bas',
 password: '12345678'
});

usu1.save();

let usu2 = new Usuario({
 login: 'pedritopeleon',
 password: '87654321'
});

usu2.save();