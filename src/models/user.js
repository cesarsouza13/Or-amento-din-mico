
const mongoose = require('../database');

const UserSchema = new mongoose.Schema({  // Schema sao os mapeamentos dos campos dentro do banco de dados
name: {
    type: String,
    required: true,
},

email: {
    type: String,
    required: true,
},


cnpj: {
    type: String,
    required: true, // exige campo obrigatorio
    //select: false, // nao demonstra a string
},

cep: {
    type: String,
    required: true,
},

tel: {
    type: String,
    required: true,
},

createdAt: {
    type: Date,
    default: Date.now,
},

});

const User = mongoose.model('User', UserSchema); //definindo meu model do mongoose, objeto Usuario do mongoose


module.exports = User;   // exporto o usuario criado