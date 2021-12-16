let menuHamburguer = document.querySelector(".menu-hamburguer");

/*Evento que mostra e esconde o menu retrátil*/
menuHamburguer.addEventListener("click",function(){
    let menuRetratil = document.querySelector(".menu-retratil");
    menuRetratil.classList.toggle("menu-retratil-todo");
});

