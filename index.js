var getJSON = function (url, sucesso, erro) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.responseType = "json";
    httpRequest.addEventListener("readystatechange", function (event) {
      if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
          if (sucesso) sucesso(httpRequest.response);
        } else {
          if (erro) erro(httpRequest.status, httpRequest.statusText);
        }
      }
    });

    httpRequest.send();
  }

// set Json
var setJSON = function (id, nome){    
    var url = "http://localhost:3000/produtos";

    var data = {};
    data.id = id;
    data.nome  = nome;
    var json = JSON.stringify(data);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var produtos = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(produtos);
        } else {
            console.error(produtos);
        }
    }
    xhr.send(json);

}

//Update Json

var updateJSON = function (id, nome){    
    var url = "http://localhost:3000/produtos";

    var data = {};
    data.id = id;
    data.nome  = nome;
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url+'/'+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.send(json);

}


//Delete 

var deleteJSON = function (id){    
    var url = "http://localhost:3000/produtos";

    var data = {};
    data.id = id;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url+'/'+id, true);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.send(null);

}


//para chamar o método, faça o seguinte
getJSON('http://localhost:3000/produtos', function (data) {
        var view = "<ul>\n";
        for (var i in data) {
        view += '<li>Id: '+data[i].id+'</li>\
                    <li>Nome: '+data[i].nome+'</li><br>'
        }
        view += "\n</ul>";

        /* procura o elemento através da sua id
            e imprime o conteúdo */

        document.getElementById('view').innerHTML = view;

    }, function (errorCode, errorText) {
        console.log('Código: ' + errorCode);
        console.log('Mensagem de erro: ' + errorText);
});


function incluirItem(){

    var id = document.getElementById('id').value;
    var nome = document.getElementById('nome').value;

    console.log(id);

    setJSON(id , nome);

    window.location.reload();
}

function excluirItem(){

    var id = document.getElementById('id').value;

    deleteJSON(id);

    window.location.reload();
}

function alterarItem(){
    var id = document.getElementById('id').value;
    var nome = document.getElementById('nome').value;

    updateJSON(id, nome);

    window.location.reload();
}