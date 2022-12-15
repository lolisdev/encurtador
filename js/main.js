const $burger = document.querySelectorAll('.menu')[0];
const $items = document.querySelector('nav ul');
const $icon = document.querySelectorAll('.hamburger')[0];
const $btn_encurtar = document.querySelectorAll('#btn_encurtar')[0];
var $link = (document.querySelector("#encurtar"));

$burger.addEventListener('click', ()=>{
    $items.classList.toggle('open_burger');
    $icon.classList.toggle('close_icon');
})

$items.addEventListener('click', ()=>{
    $items.classList.remove('open_burger');
    $icon.classList.toggle('close_icon');
})

$btn_encurtar.addEventListener('click', ()=>{
    if($link.value === ''){
        alert("Favor inserir o link a ser encurtado.")
    }else{


        fetch('https://api.encurtador.dev/encurtamentos',
        {
            url: "https://google.com",
            method: "POST",
            mode: 'cors',
            cache: 'default'
        })
        .then(
            res => {
                alert("Link encurtado: "+ res)
            }
        )
        .catch(
            err => {
                alert("Erro ao encurtar. Verifique a URL ou tente novamente mais tarde.\nErro: "+ err)
            }
        )
    }
})

