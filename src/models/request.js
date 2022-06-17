

// estou criando o modelo padrão do meu banco de dados
const mongoose = require('../database');

const BudgetSchema = new mongoose.Schema({  // Schema sao os mapeamentos dos campos dentro do banco de dados

    client: {
        type: Object
    },
    product:{
        type: Array,
        required: true
    },
    budget: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Budget = mongoose.model('Budget', BudgetSchema); //definindo meu model do mongoose, objeto Usuario do mongoose


module.exports = Budget;   // exporto o usuario criado