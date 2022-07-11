//Array que armazenara todas as operações realizadas no programa
var operations=[];

//Array de ações/stocks que estarão disponíveis para operações
var stocks = [
    {
        codigo:'PETR4',
        nome:'Petrobras'
    },
    {
        codigo:'ABEV3',
        nome:'Ambev'
    },
    {
        codigo:'VALE3',
        nome:'Vale'
    },
]

//Inserindo as ações/stocks dentro da tag select
for(stock of stocks){
    let option = document.createElement('option');
    option.value = stock.codigo+"-"+stock.nome;
    option.innerHTML = stock.codigo+"-"+stock.nome;

    let select = document.getElementById("stocks")
    select.appendChild(option)
}

//Função para exibir e esconder a div com formulário e informações da última operação realizada
function showForm(){
    displayForm = document.getElementById("form").style.display
    displayDetails = document.getElementById("details").style.display

    co = document.getElementById("co")
    

    if((displayForm == "" && displayDetails == "") || (displayForm == "none" && displayDetails == "none") ){
        document.getElementById("form").style.display = "grid"
        document.getElementById("details").style.display = "grid"
        co.innerHTML="Esconder formulário"
    }else{
        document.getElementById("form").style.display = "none"
        document.getElementById("details").style.display = "none"
        co.innerHTML="Cadastrar operações"
    }
}

//Função para exibir e esconder tabela com todas as operações já realizadas
function showList(){
    displayList = document.getElementById("list").style.display
    lo = document.getElementById("lo")
    if(displayList=="" || displayList=="none"){
        document.getElementById("list").style.display = "block"
        lo.innerHTML="Esconder lista"
    }else{
        document.getElementById("list").style.display =""
        lo.innerHTML="Listar operações"
    }
}

//Função para inserir os novos registros de operação dentro da tabela que lista todas as operações
var contList=0; // Variavel de controle para que não sejam exibidos registros repetidos
function listOperations(){
    //Percorre o array de operações a partir do valor de 'contList' e cria novas linhas na tabela
    for(let i=contList;i<operations.length;i++){
        //Criando Linha ,Adicionando ID e evento de onclick para deletar o elemento
        let tr = document.createElement("tr");
        tr.id=i;
        tr.onclick = function(){
            document.getElementById(i).remove()
        }
        
        //Criando Celulas da linha
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        
        //Inserindo detalhes da operação nas celulas
        td1.innerText=operations[i].tipoDeOperacao
        td2.innerText=operations[i].stock.codigo
        td3.innerText=operations[i].quantidade
        td4.innerText=operations[i].custoUnitario.toFixed(2)
        td5.innerText=operations[i].getValorDeNegociacao().toFixed(2)

        //Inserindo celulas na linha
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        //Adicionando linha à tabela
        table = document.getElementById("operationTable");
        table.appendChild(tr);
        
        contList++;
    }

}

function registerOperation(){
    //Modelagem da operação que será inserida no array global de operações
    let tempOperation={
        tipoDeOperacao: String,
        quantidade: Number,
        custoUnitario: Number,
        taxas: Number,
        stock:{
            codigo:String,
            nome:String
        },
        getValorDeNegociacao:function(){
            let v = Number(this.quantidade*this.custoUnitario);
            if(this.tipoDeOperacao=='Compra'){
                return Number(v+this.taxas);
            }else{
                return Number(v-this.taxas);
            }
        }
    }

    //Pegando os dados do formulário
    let operationType = document.querySelector('input[name="operacao"]:checked').value;
    let choosedStock = document.getElementById("stocks").value;
    [stockCod,stockName]=choosedStock.split("-");
    let Q = Number(document.getElementById("q").value);
    let U = Number(document.getElementById("u").value);
    let C = Number(document.getElementById("c").value);
    
    //Calculando o resto das variáveis
    let V = Q*U;
    let E = (0.003125/100)*V;
    let L = (0.0275/100)*V; 
    let T = E+L+C;
    
    //Inserindo variaveis no objeto temporario
    tempOperation.tipoDeOperacao=operationType;
    tempOperation.quantidade=Q;
    tempOperation.custoUnitario=U;
    tempOperation.taxas=T;
    tempOperation.stock.codigo=stockCod;
    tempOperation.stock.nome=stockName;

    //inserindo objeto temporario no array global
    operations.push(tempOperation)

    let X = tempOperation.getValorDeNegociacao()
    
    //Colocando as informações a última operação na tela
    document.getElementById("d_operacao").innerHTML = operationType;
    document.getElementById("d_stock").innerHTML = stockCod;
    document.getElementById("d_quantidade").innerHTML = Q;
    document.getElementById("d_unidade").innerHTML = U;
    document.getElementById("d_corretagem").innerHTML = C.toFixed(2);
    document.getElementById("d_valorcompra").innerHTML= V.toFixed(2);
    document.getElementById("d_emolumentos").innerHTML= E.toFixed(2);
    document.getElementById("d_liquidacao").innerHTML = L.toFixed(2);
    document.getElementById("d_taxas").innerHTML = T.toFixed(2);
    document.getElementById("d_total").innerHTML = X.toFixed(2);

    //Executando a função de listar a novas operações
    listOperations()
    
}




