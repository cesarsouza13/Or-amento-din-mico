
class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.edit = null;
        this.clear = false;
        this.Total = 0;

    }

    //funções dos metodos

    ReadData() {  //metodo responsavl por ler os dados do input e criar objeto produto com 3 atributos
        let produto = {}
       
        produto.area = document.getElementById('area').value
        produto.comprimento = document.getElementById('comprimento').value      
        produto.descricao = document.getElementById('description').value
        produto.altura = document.getElementById('altura').value
        produto.dimensao = produto.comprimento * produto.altura
        produto.nomeProduto = document.getElementById('inputproduto').value 
        produto.valorProduto = Number(document.getElementById('value').value)     
        produto.id = this.id;
        produto.valortotal = produto.valorProduto * produto.dimensao
       
       

        return produto;
    }

    Validation(produto) {

        let msg = '';
        if (produto.nomeProduto === '') {
            msg += 'Informe o nome do produto \n'
        }

        if (produto.comprimento === '') {
            msg += 'Informe o comprimento do produto \n'
        }

        if (produto.altura === '') {
            msg += 'Informe a altura do produto \n'
        }
        if (msg != '') {
            alert(msg)
            return false
        }
        return true
    }

    Adicionar(produto) {   //metodo responsavel por criar um array de objetos
       
        this.arrayProdutos.push(produto);  //metodo push reponsavel por add um item a cada chamada para o array
        this.id++;
        this.Total += produto.valortotal;

    }

    ListaTabela() {  //metodo responsavel por gerar as linhas das tabelas com conteudos
        let tbody = document.getElementById("tbody");
        
        let tdFoot = document.getElementById("RowTotal")
        tdFoot.innerText = this.Total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        tbody.innerText = '';
      

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_comprimento = tr.insertCell()
            let td_altura = tr.insertCell()
            let td_dimensao = tr.insertCell()
            let td_valorTotal = tr.insertCell();
            let td_area = tr.insertCell();
            let td_descricao = tr.insertCell();
            let td_acoes = tr.insertCell();

          
            td_id.innerText = this.arrayProdutos[i].id
            td_produto.innerText = this.arrayProdutos[i].nomeProduto
            td_valor.innerText = this.arrayProdutos[i].valorProduto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            td_comprimento.innerText = this.arrayProdutos[i].comprimento
            td_altura.innerText = this.arrayProdutos[i].altura
            td_dimensao.innerText = this.arrayProdutos[i].dimensao
            td_valorTotal.innerText = (this.arrayProdutos[i].valortotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            td_area.innerText = this.arrayProdutos[i].area
            td_descricao.innerText = this.arrayProdutos[i].descricao
            
            td_id.classList.add('center')  //responsavel por adicionar class a coluna td

            let imgEdit = document.createElement('img');
            imgEdit.src = '../pictures/botao-editar.png'
            imgEdit.setAttribute("onclick", "produto.Edit(" + JSON.stringify(this.arrayProdutos[i]) + "), CreateField()");
            td_acoes.appendChild(imgEdit)


            let imgDelete = document.createElement('img');
            imgDelete.src = '../pictures/excluir.png'
            imgDelete.setAttribute("onclick", "produto.Delete(" + this.arrayProdutos[i].id + ")");
            td_acoes.appendChild(imgDelete)

        }
        console.log(this.arrayProdutos)
        
       
    }

    Delete(id) {
        
        if (confirm('deseja realmente deletar o produto ' + id + ' ?')) {
            let tbody = document.getElementById("tbody");
         
            for (let i = 0; i < this.arrayProdutos.length; i++) {


                if (this.arrayProdutos[i].id == id) {
                    
                    let tdFoot = document.getElementById("RowTotal")
                    this.Total -= this.arrayProdutos[i].valortotal;
                    tdFoot.innerText = this.Total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i);

                }
            }
        }
    }



    Edit(data) {

        this.edit = data.id;
        document.getElementById('inputproduto').value = data.nomeProduto;
        document.getElementById('area').value = data.area;
        document.getElementById('comprimento').value = data.comprimento;
        document.getElementById('altura').value = data.altura;
        document.getElementById('description').value = data.descricao;
        document.getElementById('value').value = data.valorProduto;
        document.getElementById('add').innerText = 'Atualizar';

    }

    Refresh(id, produto) {  //metodo que atualiza o array de objetos apos editar o produto
           
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            
            if (this.arrayProdutos[i].id == id) {

                let dif = produto.valortotal - this.arrayProdutos[i].valortotal;
             
                if(dif < 0){
                    
                    this.Total += dif;
                }
                else if(dif >= 0){
                   
                    this.Total += dif;
                }

                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].valorProduto = produto.valorProduto
                this.arrayProdutos[i].comprimento = produto.comprimento
                this.arrayProdutos[i].altura = produto.altura
                this.arrayProdutos[i].dimensao = this.arrayProdutos[i].comprimento * this.arrayProdutos[i].altura
                this.arrayProdutos[i].valortotal = this.arrayProdutos[i].dimensao * produto.valorProduto;
                this.arrayProdutos[i].area = produto.area
                this.arrayProdutos[i].descricao = produto.descricao

               

                }

            }
        }
    

    Filter(ordem) {


        if(ordem === true){
           let  img_ordem = document.getElementById("img_ordem")
            document.getElementById("img_ordem").src =  '../pictures/decrescente.png'
            img_ordem.setAttribute("onclick", "produto.Filter(false)");
           
           
            this.arrayProdutos.sort(function (a, b) {
                if (a.area > b.area) {
                   
                    return true
    
                }
                else {
                    return -1;
                }
            })

        }

        else if(ordem === false){
            let  img_ordem = document.getElementById("img_ordem")
            document.getElementById("img_ordem").src =  '../pictures/crescente.png'
            img_ordem.setAttribute("onclick", "produto.Filter(true)");
            this.arrayProdutos.sort(function (a, b) {
                if (a.area < b.area) {
                   
                    return true
    
                }
                else {
                    return -1;
                }
            })
        }
           

        this.ListaTabela();
    }




    ValidationRequest(user, body) {
        let msg = '';
        if (user.email === 'Email') {
            msg += 'Informe o cliente \n'
        }

        if (body.product.length === 0) {
            msg += 'Insira os produtos \n'
        }

        if(body.budget === ''){
            msg += 'Declare a identificação do orçamento'
        }

        if (msg != '') {
            alert(msg)
            return false
        }
        return true

    }


    // metodos da classe
    Add() {
        let produto = this.ReadData();
        if (this.Validation(produto)) {  //se os campos estiverem preenchidos ele registra o produto
            if (this.edit == null) {

                this.Adicionar(produto)
            }
            else {
                this.Refresh(this.edit, produto)
            }
        }
        this.ListaTabela();
        this.Cancel();
    }


    Cancel() {
        document.getElementById('inputproduto').value = '';
        document.getElementById('description').value = '';
        document.getElementById('value').value = '';
        document.getElementById('comprimento').value = '';
        document.getElementById('altura').value = '';
        document.getElementById('area').value = '';

        document.getElementById('add').innerText = 'Salvar'
        this.edit = null;


    }

    DeleteAll() {
            if(this.clear === true){
                if (confirm('deseja realmente deletar o orçamento?')) {
                
                    let tdFoot = document.getElementById("RowTotal")
                    let tbody = document.getElementById("tbody");
                    this.Total = 0;
                    tdFoot.innerText = this.Total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                    let length = this.arrayProdutos.length

                    for (let i = 0; i < length; i++) {
                       
                        this.id = 1;
                        this.arrayProdutos = [];
                        tbody.deleteRow(0);
                    }
                }
            }
            else{
              
                let tdFoot = document.getElementById("RowTotal")
                let tbody = document.getElementById("tbody");
                this.Total = 0;
                tdFoot.innerText = this.Total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                

                
                let length = this.arrayProdutos.length
                for (let i = 0; i < length; i++) {
                   
                    this.id = 1;
                    this.arrayProdutos = [];
                    tbody.deleteRow(0);

            }

    }
}

    SendRequest() {
            console.log("oi")
        const name = document.getElementById('name').innerText;
        const email = document.getElementById('email').innerText;
        const cpf = document.getElementById('cpf').innerText;
        const cep = document.getElementById('cep').innerText;
        const tel = document.getElementById('tel').innerText;
      

        const user = {
            "name": name,
            "email": email,
            "cpf": cpf,
            "cep": cep,
            "tel": tel
        }

        let budget = document.getElementById('inputbudget').value

        
       
        let body = {
            "client": user,
            "product": this.arrayProdutos,
            "budget" : budget

        }
    
        console.log(this.arrayProdutos)
        
      

        if (this.ValidationRequest(user, body)) {
            alert('Orçamento criado')
            this.clear = false;
           
            fazpostRequest(body)
            
            for(let i = 0; i < this.arrayProdutos.length; i++){
            
                 this.arrayProdutos[i].comprimento = "";
                 this.arrayProdutos[i].altura = "";
                 this.arrayProdutos[i].dimensao = "";
                 delete this.arrayProdutos[i].valorProduto;
                 this.arrayProdutos[i].id = "";
        
                }
                
            const values = this.arrayProdutos.map(Object.values); // a cada objeto passado gera um novo array com todos os valores do objeto a fim de dissolver os objetos
            const request = {
                    "values": values
                }
            JSON.stringify(request);
            this.DeleteAll();
            fazGetgoogleSheet(request);
            //fazDeletegoogleSheet(request);
            
            
            this.clear = true;
           

          
            document.getElementById('name').innerText = 'Cliente'
            document.getElementById('email').innerText = 'Email'
            document.getElementById('cpf').innerText = 'CPF/CNPJ'
            document.getElementById('cep').innerText = 'CEP'
            document.getElementById('tel').innerText = 'Tel'
            document.getElementById('inputcliente').value = ''
            document.getElementById('inputbudget').value = ''
           
        }


    }



}

let produto = new Produto();


async function fazpostRequest(body) {
  

    const url = 'http://localhost:3000/register/budget'

    try {

        const response = await axios.post(url, body)// Acessando a rota post da minha API com axios

        const data = response.data;
       

    }
    catch (error) {
        console.log(error)
        const alert = 'Preencha os campos para cadastro'
        window.alert(alert)

    }
}

async function fazGetgoogleSheet(request){

    const url = "http://localhost:3000/rows";
    let index;
    try {
         index = await axios.get(url);
         console.log(index.data[0])
    }

    catch (error){
        console.log(error)
    }

    fazCleangoogleSheet(index,request);
}

async function fazCleangoogleSheet(index,request) {

    const url = "http://localhost:3000/delete/"+ `${index.data}`;
  

    try {
        const response = await axios.post(url)
        const data = response.data
        
        
    }

    catch (error) {
        console.log(error)
    }

    fazDeletegoogleSheet(index,request);
}

async function fazDeletegoogleSheet(index,request) {
   
    const url = "http://localhost:3000/deleterows/"+ `${index.data}`;
  

    try {
        const response = await axios.post(url)
        const data = response.data
       
        
    }

    catch (error) {
        console.log(error)
    }

    fazInsertgoogleSheet(request);
}

async function fazInsertgoogleSheet(request) {

    let endrow = request.values.length + 21;

    const url = "http://localhost:3000/insertrows/" + `${endrow}`;
  

    try {
        const response = await axios.post(url,request)
        const data = response.data
       
        
    }

    catch (error) {
        console.log(error)
    }

    fazPostgoogleSheet(endrow,request);
}

async function fazPostgoogleSheet(endrow,request) {  //preenche a planilha no google sheets com metodo CRUD pela rota
   
    endrow++;
    const url = "http://localhost:3000/update/"+ `${endrow}`
    try {
        const response = await axios.post(url, request)
        const data = response.data;
        
    }

    catch (error) {
        console.log(error)

    }

    fazMergegooglesheet( request);

}

async function fazMergegooglesheet(request){

    let endrow = request.values.length;
    const url = "http://localhost:3000/mergecells/"+ `${endrow}`;
    try {
        const response = await axios.post(url, request)
        const data = response.data;
      
    }

    catch (error) {
        console.log(error)

    }
}