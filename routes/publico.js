const express = require('express');
const Juego = require('../models/juego');
const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');

mongoose.connect('mongodb://mymongodb/playrest_v3');

let router = express.Router();

router.get('/', (req, res) => {
    res.render("publico_index");
});

router.get('/buscar', (req, res) => {
    Juego.find().then(resultado => {
        if (resultado && resultado.length > 0)
        {
            let filtrados = resultado.filter(resultadillo => resultadillo.nombre.includes(req.query.nombre));
            if (filtrados.length > 0)
                res.render("publico_index", {juegos: filtrados});
            else
                res.render("publico_index", {mensaje: "No se han encontrado juegos que coincidan con la busqueda"});
        }
        else
        {
            res.render("publico_index", {mensaje: "No se han encontrado juegos"});
        }        
    }).catch(error => {
        res.render("publico_error");
    });
});

router.get('/juegos/:id', (req, res) => {
    Juego.findById(req.params.id).then(resultado => {
        if(resultado)
            res.render("publico_juego", {juego: resultado});
    }).catch (error => {
        res.render("publico_error", {error: "Juego no encontrado"});
    }); 
});

router.get('/usuarios', (req, res) => {
    Usuario.collection.drop();

    let usu1 = new Usuario({
    login: 'Rocio_a_donde_Bas',
    password: '12345678'
    });

    usu1.save();
});

module.exports = router;