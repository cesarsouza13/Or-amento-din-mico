
// estou criando o modelo padrão do meu banco de dados
const mongoose = require('../database');

const ProductSchema = new mongoose.Schema({  // Schema sao os mapeamentos dos campos dentro do banco de dados
name: {
    type: String,
    required: true,
},

value: {
    type: String,
    required: true,
},

area: {
    type: String,
    required: true, // exige campo obrigatorio
    //select: false, // nao demonstra a string
},

createdAt: {
    type: Date,
    default: Date.now,
},

});

const Product = mongoose.model('Product', ProductSchema); //definindo meu model do mongoose, objeto Usuario do mongoose


module.exports = Product;   // exporto o usuario criado