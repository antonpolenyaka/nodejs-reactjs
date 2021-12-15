"use strict";

// información de proceso
var info = {
    pid: process.pid, // numero del proceso
    version: process.version,
    platform: process.platform,
    tile: process.title,
    argumentos: process.argv,
    execPath: process.execPath,
    carpeta: process.cwd()
};

console.log('entro en ', info);

process.on('exit', function() {
    console.log('Adios. Antes de terminar me despido');
});

console.log('fin del proceso');

var events = require('events');
var myEmitter = new events.EventEmitter();
myEmitter.on('llamar telefono', sonarTelefono);
myEmitter.on('llamar telefono', vibrarTelefono);

function sonarTelefono(quien) {
    if(quien === 'madre') {
        return;
    }
    console.log('ring ring ring');
}
function vibrarTelefono() {
    console.log('brr brr brr');
}

// Ejecutamos todo lo que esta colgado con identificador
myEmitter.emit('llamar telefono', 'madre')

process.exit(0); // esto temina ejecución
console.log('el proceso ya termino, por tanto esto no se ejecuta');