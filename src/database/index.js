const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/noderest'); //conectando ao banco de dados
mongoose.Promise = global.Promise;

module.exports = mongoose;