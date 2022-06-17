

const cors = require('cors')// Permitir que minha rota fique publica

const express = require('express');//criação da aplicação chamando a função express


const app = express(); // classe app criada usando o express

app.use(cors())
app.use(express.json());  // Faz com que a API entenda as informações enviadas em json
require('./controllers/authcontroller')
(app);

app.listen(3000); //Porta que estou utilizando

console.log('server OK');

