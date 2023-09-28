const express = require('express'); 
const consign = require('consign'); // consign agrupa todas as requisições implementadas em módulos diferentes no nosso app express
const bodyParser = require('body-parser'); // lib para fazer o parser dos dados enviados para a requisição através do Body (Form URL Encoded, json, etc)

module.exports = () => {

    const app = express();
    
    // configura o bodyParser para requisições que recebem dados no formato FormURLEnconded (browser)
    app.use(bodyParser.urlencoded({extended: true}));
    // configura o bodyParser para requisições que recebem dados no formato JSON
    app.use(bodyParser.json());

    // Inclui todas as requisições implementadas dentro do diretório 'controllers' no nosso app express
    consign()
        .include('controllers')
        .into(app);

    return app;
}