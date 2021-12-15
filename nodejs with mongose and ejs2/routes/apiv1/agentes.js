"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Agente = mongoose.model('Agente');

// Middleware's
// recuperar lista de agentes
// version 1
router.get('/v1', function(req, res, next) {
    // Buscamos dentro de agentes todos, ejecutamos (operacion asincrona)
    // err - posible error, list - posible resultado
    Agente.find().exec(function(err, list) {
        // Devolvemos error si hay
        if(err) {
            next(err);
            return;
        }

        res.json({ok: true, list: list});
    });
});

// version 2 con metodo estatico
// http://localhost:3000/apiv1/agentes?limit=10&skip=2&name='AAA'&age=25&fields=age name&sort=name
router.get('/', function(req, res, next) {
    // obtenemos parametro y creamos filtro, si nos llaman con ?name=Smith&age=40
    let name = req.query.name;
    let age = req.query.age;
    let filter = {};
    if (name) {
        filter.name = name;
    }
    if(typeof age != 'undefined') { // por si nos pasan 0
        filter.age = age;
    }

    // Si queremos limitar numero de items a devolver
    let limit = parseInt(req.query.limit) || null; // para limitar resultado

    // Para paginacion usamos skip
    let skip = parseInt(req.query.skip) || null; // para limitar resultado

    // Indicamos que parametros queremos devolver
    let fields = req.query.fields || null; // los campos que queremos tener separados por espacio

    // Ordenacion
    let sort = req.query.sort || null;

    // Buscamos dentro de agentes todos, ejecutamos (operacion asincrona)
    // err - posible error, list - posible resultado
    Agente.list(filter, limit, skip, fields, sort, function(err, list) {
        // Devolvemos error si hay
        if(err) {
            next(err);
            return;
        }

        res.json({ok: true, list: list});
    });
});

// crear un agente
router.post('/', function(req, res, next) {
    console.log(req.body); // log para ver que nos llega.
    var agente = new Agente(req.body); // Basamos agente en lo que recibimos
    agente.save(function(err, agenteGuardado) {
        if(err) {
            return next(err);
            // o en dos lineas:
            // next(err);
            // return;
        }
        // Si no hay error, devolvemos OK
        res.json({ok: true, agente: agenteGuardado});
    });
}); // Para hacer pruebas usamos Postman

// actualizar un agente
router.put('/:id', function(req, res, next) {
    var id = req.params.id; // obtenemos id
    Agente.update({_id: id}, req.body, function(err, agente) {
        if(err) {
            return next(err);
        }
        res.json({ok: true, agente: agente});
    });
});

// borrar un agente
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Agente.remove({_id: id}, function(err, result) {
        if(err) {
            return next(err);
        }
        res.json({ok: true, result: result});
    });
});

module.exports = router;