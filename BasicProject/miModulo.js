function versionModulo(moduleName){
    let path = "./node_modules/";
    let fullPath = path + moduleName + "/package.json";
    // Cargamos modulo
    let pjson = require(fullPath);
    return pjson.version;
}

let nameModule = "nodemon";
var resultado = versionModulo(nameModule);
console.log("Nodemon (" + nameModule + "): " + resultado);