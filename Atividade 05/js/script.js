function mostrarMenu(){
    let menuRetratil = document.querySelector(".menu-retratil");
    if(menuRetratil.offsetWidth == 0){
        menuRetratil.style.minWidth = "400px";
    }
    else{
        
        menuRetratil.style.minWidth = "0px";
    }   
}