/* Ao carregar a página, o modal será mostrado */
let myModal = new bootstrap.Modal(document.getElementById('meuModal'), {
    keyboard: false
  })
window.onload = () => {
    myModal.show();
    carregarGrupos();
}
let listaGrupos = document.querySelector("#lista-grupos");
let login = document.querySelector("#login");
let chat = document.querySelector("#chat");
let formGrupo = document.querySelector("#form-grupo");
let formMsg = document.querySelector("#form-msg");
let nomeGrupo = document.querySelector("#form-grupo .form-control");
let novaMensagem = document.querySelector("#form-msg .form-control");
let idGrupoAtual = 0;
let nomeUsuario = "";

/*Login escondendo modal*/
login.addEventListener('click',()=>{
    nomeUsuario = document.querySelector("#login-usuario").value;
    if(usuario != ""){
        let usuario = document.getElementById("usuario");
        usuario.innerText = nomeUsuario;
        myModal.hide();
    }
})

/*Montando grupo a partir do get*/
function montarGrupo(grupo){
    let div = document.createElement("div");
    let divInterna = document.createElement("div");
    let img = document.createElement("img");
    let span = document.createElement("span");

    div.classList.add("d-flex","justify-content-between","py-2","ps-2", "align-items-center");
    img.classList.add("bg-opacity-50","bg-light","rounded-circle","p-1");
    divInterna.classList.add("text-truncate","border-bottom","border-dark","p-3","w-100");
    span.classList.add("fs-4","fc-light");

    div.id = grupo.id;
    span.innerText = grupo.nome;
    img.src = "img/friends.png";    

    div.addEventListener('click', ()=>{
        carregarMensagens(div.id);
        idGrupoAtual = div.id;
    })

    divInterna.appendChild(span);
    div.appendChild(img);
    div.appendChild(divInterna);
    listaGrupos.appendChild(div);
}

/*Montando mensagens a partir do get*/
function montarMensagem(mensagem){
    let div = document.createElement("div");
    let nome = document.createElement("span");
    let corpo = document.createElement("pre");

    div.classList.add("mensagem","my-1","px-2","rounded-3");
    nome.classList.add("m-1","h4");
    corpo.classList.add("text-wrap","ms-3","fc-light");

    nome.innerText = mensagem.nome;
    corpo.innerText = mensagem.corpo;

    div.appendChild(nome);
    div.appendChild(corpo);
    chat.appendChild(div);
}

/*Adicionando novo grupo*/
formGrupo.addEventListener('submit',(event)=>{
    event.preventDefault();
    criarGrupo();
    nomeGrupo.value = "";
});

formMsg.addEventListener('submit',(event)=>{
    event.preventDefault();
    enviarMensagem(idGrupoAtual);
    novaMensagem.value = "";
});


/* Requisições
---------------------------*/

/*GET Grupos*/
function carregarGrupos(){
    axios({
        method: 'GET',
        url: 'https://server-json-lms.herokuapp.com/grupos'
    }).then((response) => {
        listaGrupos.innerHTML = "";
        for(grupo of response.data){
            montarGrupo(grupo);
        }
    }).catch((error) => {
        console.log(error);
    });
}

/*GET Mensagens*/
function carregarMensagens(idGrupoAtual){
    axios({
        method: "GET",
        url: `https://server-json-lms.herokuapp.com/grupos/${idGrupoAtual}/mensagens`
    }).then((response) => {
        chat.innerHTML = "";
        for(mensagem of response.data){
            montarMensagem(mensagem);
        } 
    }).catch((error) => {
        console.log(error);
    })
}

/*POST Grupo*/
function criarGrupo(){
    axios({
        method: 'POST',
        url: 'https://server-json-lms.herokuapp.com/grupos',
        data: {
            "nome": nomeGrupo.value
        }
    }).then((response)=>{
        carregarGrupos();
    }).catch((error)=>{
        console.log(error);
    })
}

/*POST Mensagem*/
function enviarMensagem(idGrupoAtual){
    axios({
        method: 'POST',
        url: `https://server-json-lms.herokuapp.com/grupos/${idGrupoAtual}/mensagens`,
        data: {
            "nome": nomeUsuario,
            "corpo": novaMensagem.value,
            "grupoId": idGrupoAtual
        }
    }).then((response)=>{
        carregarMensagens(idGrupoAtual);
    }).catch((error)=>{
        console.log(error);
    });
}