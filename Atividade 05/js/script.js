let overlayModal = document.querySelector(".overlay-modal");
let formulario = document.querySelector(".formulario");
let id = 3;//Já começa com o id até o 3

/*Impedindo que o formulário atualize a página*/
formulario.addEventListener("submit",(event)=>{
    event.preventDefault();
})

/*Evento que mostra e esconde o menu retrátil*/
let menuHamburguer = document.querySelector(".menu-hamburguer");
menuHamburguer.addEventListener("click",function(){
    let menuRetratil = document.querySelector(".menu-retratil");
    menuRetratil.classList.toggle("active");
});

/*Abrindo o modal*/
let botaoPostar = document.querySelector(".postar");
botaoPostar.addEventListener("click",function(){
    overlayModal.classList.add("active");
});

/*Fechando o modal*/
let fecharModal = document.querySelector(".fechar-modal");
fecharModal.addEventListener("click",function(){
    overlayModal.classList.remove("active");
    formulario.reset();
});

let btnCancelar = document.querySelector(".btn-cancelar");
btnCancelar.addEventListener("click",function(){
    overlayModal.classList.remove("active");
    formulario.reset();
});

window.addEventListener("click",function(event){
    if(event.target == overlayModal){
        overlayModal.classList.remove("active");
        formulario.reset();
    }
});

/*Adicionando posts*/
function novoPost(){
    id++;
    let feed = document.querySelector(".feed");
    let nome = document.querySelector("#nome").value;
    let mensagem = document.querySelector("#mensagem").value;

    feed.innerHTML+= `  <div class="post" id="${id}">
                <h2 class="nome-autor">${nome}</h2>
                <p class="mensagem">${mensagem}</p>
             </div>
    `;
    overlayModal.classList.remove("active");
    formulario.reset();
}

/*Alterando o texto em destaque*/
let cont = 1;
function mudarDestaque(){
    let destaque = document.querySelector(".destaque");
    let post = document.getElementById(cont);

    destaque.children[0].innerText = post.children[0].textContent;//Nome
    destaque.children[1].innerText = post.children[1].textContent;//Mensagem
    
    /*Garantindo que não pegue id's inexistentes*/
    if(cont < id){
        cont++;
    }else{
        cont = 1;
    }
}
mudarDestaque();//Iniciando a página logo com o primeiro post destacado
setInterval(mudarDestaque,2000);//Mudando destaque a cada 2s
