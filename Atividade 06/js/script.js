/* Ao carregar a página, o modal será mostrado */
let myModal = new bootstrap.Modal(document.getElementById('meuModal'), {
    keyboard: false
  })
window.onload = () => {
    myModal.show();
}

let login = document.querySelector("#login");
login.addEventListener('click',()=>{
    let nomeUsuario = document.getElementById("login-usuario").value;
    if(nomeUsuario != ""){
        let usuario = document.getElementById("usuario");
        usuario.innerText = nomeUsuario;
        myModal.hide();
    }
})