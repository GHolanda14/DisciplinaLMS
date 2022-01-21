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
    div.id = grupo.id;

    img.classList.add("bg-opacity-50","bg-dark","rounded-circle","p-1");
    img.src = "img/friends.png";

    divInterna.classList.add("text-truncate","border-bottom","border-dark","p-3","w-100");

    span.innerText = grupo.nome;

    divInterna.appendChild(span);
    div.appendChild(img);
    div.appendChild(divInterna);
    listaGrupos.appendChild(div);
}

/* Requisições
---------------------------*/

/*GET Grupos*/
function carregarGrupos(){
    axios({
        method: 'GET',
        url: 'https://server-json-lms.herokuapp.com/grupos'
    }).then((response)=>{
        for(grupo of response.data){
            montarGrupo(grupo);
        }
    }).catch((error)=>{
        console.log(error);
    });
}
