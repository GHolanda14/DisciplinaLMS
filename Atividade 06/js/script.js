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

/*Login escondendo modal*/
login.addEventListener('click',()=>{
    let nomeUsuario = document.getElementById("login-usuario").value;
    if(nomeUsuario != ""){
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
    img.classList.add("bg-opacity-50","bg-dark","rounded-circle","p-1");
    divInterna.classList.add("text-truncate","border-bottom","border-dark","p-3","w-100");
    span.classList.add("fs-4","fc-light");

    div.id = grupo.id;
    span.innerText = grupo.nome;
    img.src = "img/friends.png";    

    div.addEventListener('click', ()=>{
        carregarMensagens(div.id);
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

    div.classList.add("mensagem","my-1","px-2","rounded-3","bg-secondary");
    nome.classList.add("m-1","h4");
    corpo.classList.add("text-wrap","ms-3","fc-light");

    nome.innerText = mensagem.nome;
    corpo.innerText = mensagem.corpo;

    div.appendChild(nome);
    div.appendChild(corpo);
    chat.appendChild(div);
}

/* Requisições
---------------------------*/

/*GET Grupos*/
function carregarGrupos(){
    axios({
        method: 'GET',
        url: 'https://server-json-lms.herokuapp.com/grupos'
    }).then((response) => {
        for(grupo of response.data){
            montarGrupo(grupo);
        }
    }).catch((error) => {
        console.log(error);
    });
}

/*GET Mensagens*/
function carregarMensagens(idGrupo){
    axios({
        method: "GET",
        url: `https://server-json-lms.herokuapp.com/grupos/${idGrupo}/mensagens`
    }).then((response) => {
        chat.innerHTML = "";
        for(mensagem of response.data){
            montarMensagem(mensagem);
        } 
    }).catch((error) => {
        console.log(error);
    })
}