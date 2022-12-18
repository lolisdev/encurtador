const $burger = document.querySelectorAll('.menu')[0];
const $items = document.querySelector('nav ul');
const $icon = document.querySelectorAll('.hamburger')[0];
const $btn_encurtar = document.querySelectorAll('#btn_encurtar')[0];
let $link = (document.querySelector('#encurtar'));

$burger.addEventListener('click', ()=>{
    $items.classList.toggle('open_burger');
    $icon.classList.toggle('close_icon');
})

$items.addEventListener('click', ()=>{
    $items.classList.remove('open_burger');
    $icon.classList.toggle('close_icon');
})

function erro(){
    alert('Erro ao encurtar. Verifique a URL ou tente novamente mais tarde.');
    $link.value = '';
}

$btn_encurtar.addEventListener('click', ()=>{
    let link = $link.value;

    if($btn_encurtar.innerHTML == 'Copiar'){
        $link.select();
        $link.setSelectionRange(0, 99999);
        document.execCommand("copy");
        $btn_encurtar.innerHTML = 'Encurtar';
        alert("Link copiado para a área de transferência.")
        $link.value = '';
    }else{
        if(link === ''){
            alert('Favor inserir o link a ser encurtado.')
            $link.value = '';
        }
        if(link.includes(' ')){
            alert('Favor inserir o link sem espaços.')
            $link.value = '';
        }
        else{
            if(!link.includes('http')) link = 'http://'+link;

            if(link === 'http://'){
                alert('Favor inserir um link válido.')
            }
            else{
                let headers = {
                    'Content-Type': 'application/json',
                    'apiKey': '94c579cd59cf46a2bc2c1b4b7a042875' 
                }
                let linkRequest = {
                    destination: link,
                    domain: {fullName: "rebrand.ly"}
                }
                fetch("https://api.rebrandly.com/v1/links",
                {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(linkRequest)
                })
                .then(res => res.json())
                .then(json => {
                    if(json.shortUrl.includes('undefined')){
                      erro()
                    }else{
                        $link.value = 'http://www.'+json.shortUrl
                        $btn_encurtar.innerHTML = 'Copiar'
                    }
                })
                .catch(() =>{
                    erro()
                })
            }
        }
    }
})