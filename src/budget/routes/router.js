


let condition = false;
let validation = false;

  async function fazgetUser(validation){
   
    event.preventDefault();
   
    const url = 'http://localhost:3000/'
    try{
        const response = await axios.get(url)  //acessando minha API no verbo get
          if(validation === false){
            const dataUser = response.data  //retornando todo o data da URL
            console.log('My Users:', dataUser)
            ListUser(dataUser);
            }

          else if(validation === true){
            const data = response.data;
            const body = Register();
              for(let i = 0; i< data.length; i++){
                if(body.name === data[i].name){
                  window.alert('Nome ja cadastrado')
                  document.getElementById("name_client").value = '';
                
                  i = data.length;
                }
                else if(body.email === data[i].email){
        
                  window.alert('Email ja cadastrado')
                  document.getElementById("email_client").value = '';
                  i = data.length;
                }
                else if(body.cnpj === data[i].cnpj){
        
                  window.alert('cnpj ja cadastrado')
                  document.getElementById("cnpj_client").value = '';
                  i = data.length;
                }
                else if (body.cnpj !== data[i].cnpj && i === data.length - 1){

              
                  fazPostClient(body);

                 
                 
                }
          }
      }
      
    }
    catch (error){
      console.log(error)
    }  
       }

       
  async function fazgetProduct(){
    
    event.preventDefault();
   
    const url = 'http://localhost:3000/product'
    try{
        const response = await axios.get(url)  //acessando minha API no verbo get
        
        const dataProduct = response.data  //retornando todo o data da URL
        console.log('My products:', dataProduct)
    
     ListProduct(dataProduct);
      
    }
    catch (error){
      console.log(error)
    }
       }
     
   
        function register(select){
      
           if(select === 2){
            fazgetProduct();
          }

          else if(select === 3){
            fazgetUser(false);
          }
 
        }

        async function fazPostClient(body){

      
          const url = 'http://localhost:3000/register';

          try {
            const response = await axios.post(url,body);
            
            Validation(response)
            console.log(response)

          }

          catch(error){

            console.log(error);
          }

        }



        function Register(){

          event.preventDefault();
          const name = document.getElementById("name_client").value // Recebendo os dados dos campos HTML
          const email = document.getElementById("email_client").value
          const cnpj = document.getElementById("cnpj_client").value
          const cep = document.getElementById("cep_client").value
          const tel = document.getElementById("tel_client").value

          let body = {name, email, cnpj, cep, tel};
         

        
          return body;
       
          
        
         
        }

        function Validation(response) { // função responsável por validar que o usuario foi cadastrado e resetar os campos

          const alert = 'Usuario cadastrado';
        
          if(response.status === 200){
        
          window.alert(alert)
          document.getElementById("name_client").value = '';
          document.getElementById("email_client").value = '';
          document.getElementById("cnpj_client").value = '';
          document.getElementById("cep_client").value = '';
          document.getElementById("tel_client").value = '';
          }
         
        }
    

     
       

       function ListUser(dataUser){
     
       
        let datalistUser = document.getElementById('cliente');
        
        if(condition == false){
          for(let i = 0; i< dataUser.length; i++){
          
            let userOption = document.createElement('option');
            userOption.setAttribute("id", "listUser")
            userOption.setAttribute("value", dataUser[i].name)
            datalistUser.appendChild(userOption)
           
          }
        }

          AttributeClient(dataUser);
        }

        
        
      function  ListProduct(dataProduct){ 
          
          let datalistProduct = document.getElementById('produto');
          if(condition == false){
              for(let i = 0; i< dataProduct.length; i++){
               let productOption = document.createElement('option'); 
                productOption.setAttribute("class", "listProduct");
                productOption.setAttribute("value", dataProduct[i].name);
                productOption.setAttribute("value", dataProduct[i].name);
                 datalistProduct.appendChild(productOption);
                  }
                }
                   condition = true;
                    AttributeProduct(dataProduct)
                    
              
              }

             // controladores do html  
             
         function  AttributeProduct(dataProduct){
                  
              let areaProduct = document.getElementById('area')
              let nameProduct = document.getElementById('inputproduto').value
            
              if(nameProduct === ''){
                document.getElementById('value').value = '';
                document.getElementById('area').value = '';

              }
               for(let i = 0; i < dataProduct.length; i++){
                  if (nameProduct === dataProduct[i].name){
                   
                    document.getElementById('area').value = dataProduct[i].area;
                    document.getElementById('value').value = dataProduct[i].value;
                   }
                  }
                }

              function AttributeClient(dataUser){
                  
                  let client = document.getElementById('inputcliente').value;
             
                  for (const i in dataUser){
                    if(client === dataUser[i].name){

                        document.getElementById('name').innerText = dataUser[i].name
                        document.getElementById('email').innerText = dataUser[i].email
                        document.getElementById('cpf').innerText =  dataUser[i].cnpj
                        document.getElementById('cep').innerText = dataUser[i].cep
                        document.getElementById('tel').innerText = dataUser[i].tel

                        
                        
                  

                      }

                    }
                  

                    
                }

                
              
              