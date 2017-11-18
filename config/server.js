/** Importação do modulo express */
var express = require('express');

/** Importação do modulo consign */
var consign = require('consign');

/** Importação do modulo body-parser */
var bodyParser = require('body-parser');

/** Importação do modulo express-validator */
var expressValidator = require('express-validator');

/** Inicialização do express */
var app = express();

/** Configurações de modulos e middlewares do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/** Exportação do objeto APP */
module.exports = app;