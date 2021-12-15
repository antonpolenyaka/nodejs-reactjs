"use strict";

var mongoose = require('mongoose');

var agenteSchema = mongoose.Schema({
    name: String,
    age: Number
});

agenteSchema.statics.list = function(filter, limit, skip, fields, sort, cb) { // cb - callback
    var query = Agente.find(filter); // sin llegar a ejecutar
    query.limit(limit);
    query.skip(skip); // antes de hacer skip, primero ordenara y luego va hacer skip!
    query.select(fields);
    query.sort(sort);
    query.exec(function(err, result) {
        cb(err, result);
    }); // Ejecutar query o query.exec(cb); // directamente llamar al "cb"
}

// Creando modelo con 2 parametros
// var Agente -> luego hace hoisting hacia arriba y por esto no falla en declaracion
// del metodo estatico al usar Agente
// ES IMPORTANTE, que var Agente = ... sea despues de agenteSchema.statics.list = ...
var Agente = mongoose.model('Agente', agenteSchema);

// Uso, busqueda de modelo: mongoose.model('Agente')
// No hace falta exportar nada