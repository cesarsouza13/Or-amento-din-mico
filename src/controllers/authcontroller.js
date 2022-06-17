// definindo as rotas nesse arquivo

const express = require('express');
const User = require('../models/User');
const Product = require('../models/product');
const Budget = require('../models/request');
const {google} = require('googleapis')
const app = express()
app.use(express.json())

const router = express.Router(); //definindo rota através do express


async function getAuthSheets(){

  const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets"
  })


  const client = await auth.getClient();

  const googleSheets = google.sheets({
      version: "v4",
      auth: client
  })
  
  const spreadsheetId = "1gZ4X7jEVNawY-PwIdiQwZL0tHXlU0Wajx-vnERe3BVU"
  const sheetId = "1565394985"
  return{
      auth,
      client,
      googleSheets,
      spreadsheetId,
      sheetId
  };
}

router.get('/data', async(req, res) =>{

  const {googleSheets, auth, spreadsheetId} = await getAuthSheets();

  const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
      
  })

  res.send(metadata);
})

router.get('/rows', async(req,res) =>{

  const {googleSheets, auth, spreadsheetId} = await getAuthSheets();
 
  const rows = await googleSheets.spreadsheets.values.get({

    auth,
    spreadsheetId,
    range: "orc!A23:A100"

  });

  let endrow;
   for( let end = 0; end< rows.data.values.length; end++){
  
 
    if(rows.data.values[end][0] ===  'Garantia' ){
     
     
      
      end = 22 + end;
    
      endrow = [end]; 
      end = rows.data.values.length;
     
      
      console.log("ultima linha",endrow)

      rows.data.values.length = end;
     
    }
    
   }
   
     res.send(endrow);
});


router.post('/update/:endrow', async(req,res) =>{
  const {googleSheets, auth, spreadsheetId} = await getAuthSheets();

  console.log(req.params)
  const {endrow} = req.params ;
  
  const {values} = req.body ;
  

 
    const updateValues = await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      range: "orc!A23:I"+`${endrow}`,
      valueInputOption: "USER_ENTERED",
      resource:{
        values: values     
      }
    });
  
  
   
     res.send(updateValues.data)
   
})

router.post('/delete/:endrow',async(req,res) =>{

  console.log(req.params)
  const {endrow} = req.params;
  
  console.log("ultima linha",endrow)
  const {googleSheets, auth, spreadsheetId} = await getAuthSheets();

  const response = await googleSheets.spreadsheets.values.clear({
      auth,
      spreadsheetId,
      range: "orc!A23:I"+`${endrow}`
  })
  res.send("Delete sucess")
});

router.post('/deleterows/:endrow',async(req,res) =>{
  console.log(req.params)
  const {endrow} = req.params;
  
  console.log("ultima linha",endrow)
 
  const {googleSheets, auth, spreadsheetId, sheetId} = await getAuthSheets();

  let request = {
    "requests": [
      {
        "deleteDimension": {
          "range": {
            "sheetId": sheetId,
            "dimension": "ROWS",
            "startIndex": 23,
            "endIndex": endrow
          }
        }
      }
    ]
  }

  const response = await googleSheets.spreadsheets.batchUpdate({
      auth,
      spreadsheetId,
      resource: request
  })
  res.send("Delete rows sucess")
});

router.post('/insertrows/:endrow',async(req,res) =>{

  const {googleSheets, auth, spreadsheetId, sheetId} = await getAuthSheets();
  const {endrow} = req.params;
  console.log("ultima linha",endrow)
  let request = {
    "requests": [
      {
        "insertDimension": {
          "range": {
            "sheetId": sheetId,
            "dimension": "ROWS",
            "startIndex": 22,
            "endIndex": endrow
          },
          "inheritFromBefore": true
        }
      }
    ]
  }

  const response = await googleSheets.spreadsheets.batchUpdate({
      auth,
      spreadsheetId,
      resource: request
  })
  
  res.send("insert rows sucess")
});


router.post('/mergecells/:endrow',async(req,res) =>{

  const {googleSheets, auth, spreadsheetId, sheetId} = await getAuthSheets();
  const {endrow} = req.params;
  for(let i = 0; i < endrow.valueOf() ; i++){
    let k = 0;
    for(let j = 0; j< 10; j++){
    
      if(j==4){
        j++;
      }
      if(k==2){
        k++;
      }
      console.log("inicio",j, "fim", k)
        let request = {
          "requests": [
            {
              "mergeCells": {
                "range": {
                  "sheetId": sheetId,
                  "startRowIndex": 22 + i,
                  "endRowIndex": 23 + i,  //quantidade de objetos com o mesmo ambiente
                  "startColumnIndex": 0 + j,
                  "endColumnIndex": 2 + k
                },
                "mergeType": "MERGE_ALL"
              }
            },
          ]
        }

        const response = await googleSheets.spreadsheets.batchUpdate({
            auth,
            spreadsheetId,
            resource: request
        })
          
      if(j==2){
       
        j++;
       
      }
        k = k +2;
        j++;
        
      }
 
   }
res.send("merge sucess")
});


  




//rota do get
router.get('/', async (req, res ) => {
 

  
 
try{
  const data = await User.find()  // metodo do mongoose que  retorna para mim todos os usuarios do banco de dados do mongo db
  console.log('get chamado')
  return res.send(data)
  
}
  catch(error){

    return res.status(400).send({ error: 'Resource failed'});
  }});

router.get('/budget', async (req, res ) => {
 
  console.log(req.data)
 
try{
  const data = await Budget.find()  // metodo do mongoose que  retorna para mim todos os orçamentos do banco de dados do mongo db
  console.log('get chamado')
  return res.send(data)
  
}
  catch(error){

    return res.status(400).send({ error: 'Resource failed'});
  }});

router.get('/product', async (req, res ) => {
 
    console.log(req.data)
   
  try{
    const data = await Product.find()  // metodo do mongoose que  retorna para mim todos os produtos do banco de dados do mongo db
    console.log('get chamado')
    return res.send(data)
    
  }
    catch(error){
  
      return res.status(400).send({ error: 'Resource failed'});
    }});


// rota do post
router.post('/register', async (req, res) => {  //post: vou enviar os dados do usuario para a resource
  console.log('post chamado')
  console.log(req.body)

  try {
    const {name, email , cnpj, cep, tel} = req.body;   // associando as variaisveis recebidas do body da requisicao
    console.log({name, email, cnpj, cep, tel})
      const user = await User.create({name, email, cnpj, cep, tel}); // todos os parametros da requisição sao passados/ await espera compilaçao
     
      return res.send({ user }); // estou retornando e enviando os dados do usuario
      
    }
    
    catch (error){
        return res.status(400).send({ error: 'Resgistration failed'}); // retorna e envia erro 400 caso registro de usuario falhar
    }});

router.post('/register/product', async (req, res) => {  //post: vou enviar os dados do usuario para a resource
      console.log('post chamado')
      console.log(req.body)
    
      try {
        const {name, value, area} = req.body;   // associando as variaisveis recebidas do body da requisicao
        console.log({name, value, area})
          const user = await Product.create({name, value, area}); // todos os parametros da requisição sao passados/ await espera compilaçao
         
          return res.send({ user }); // estou retornando e enviando os dados do usuario
          
        }
        
        catch (error){
            return res.status(400).send({ error: 'Resgistration failed'}); // retorna e envia erro 400 caso registro de usuario falhar
        }});

router.post('/register/budget', async (req, res) => {  //post: vou enviar os dados do usuario para a resource
          console.log('post chamado')
          console.log(req.body)
        
          try {
            const request = req.body;   // associando as variaisveis recebidas do body da requisicao
            
            console.log(request)
              const budget = await Budget.create(request); // todos os parametros da requisição sao passados/ await espera compilaçao
             
              return res.send({ budget }); // estou retornando e enviando os dados do usuario
             
            }
            
            catch (error){
                return res.status(400).send({ error: 'Resgistration failed'}); // retorna e envia erro 400 caso registro de usuario falhar
            }});

    module.exports = app => app.use('/', router); 