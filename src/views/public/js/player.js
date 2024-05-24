const musicaAtual = document.querySelector("#musica")
const playPause = document.querySelector("#playPause")
const MusicaAterior = document.querySelector("#MusicaAnterior")
const ProximaMusica = document.querySelector("#ProximaMusica")
const progress = document.querySelector("#duration")
const icon_playPause = document.querySelector("#icon_playPause")
const logout = document.querySelector("#logout")
const img = document.querySelector("#foto_musica")
const nome = document.querySelector(".nome")
const banda = document.querySelector(".banda")
//pegando token
var axiosConfig = {
    headers: {
        authorization: "Bearer " + localStorage.getItem("token")
    }
}
//pegando ultimo parametro de rota
let url = window.location.href.toString()
url = url.split("/")
let ParametroRota = url[url.length-1]
//colocando a musica na tag audio
axios.get("http://localhost:8081/inicio/musicas/"+ParametroRota,axiosConfig).then((data)=>{
    musicaAtual.src  = data.data.src
    img.src = data.data.Foto
    nome.textContent = data.data.nome
    banda.textContent = data.data.artista
})
//trocando de musica ao apertar nos botões
axios.get('http://localhost:8081/inicio/musicas',axiosConfig).then((data)=>{
    const lista = data.data
    const srcVerificar = musicaAtual.src.split('8081')[1]
    
    lista.forEach((musicas)=>{
        
        if(musicas.src == srcVerificar){
            var indexAtual = lista.indexOf(musicas)
            
            MusicaAterior.addEventListener('click',async()=>{
                
                if(indexAtual == 0){
                    indexAtual = lista.length-1
                    musicaAtual.src = lista[indexAtual].src
                    img.src = lista[indexAtual].Foto
                    banda.textContent = lista[indexAtual].artista
                    nome.textContent = lista[indexAtual].nome
                    window.history.replaceState(null,null,lista[indexAtual].nome)
                    musicaAtual.play()
                    icon_playPause.classList.replace("fa-play","fa-pause")
                }else{
                    indexAtual--
                    musicaAtual.src = lista[indexAtual].src
                    img.src = lista[indexAtual].Foto
                    banda.textContent = lista[indexAtual].artista
                    nome.textContent = lista[indexAtual].nome
                    window.history.replaceState(null,null,lista[indexAtual].nome)
                    musicaAtual.play()
                    icon_playPause.classList.replace("fa-play","fa-pause")
                    
                }
            })
            ProximaMusica.addEventListener('click',()=>{
                
                if(indexAtual == lista.length-1){
                    indexAtual = 0
                    musicaAtual.src = lista[indexAtual].src
                    img.src = lista[indexAtual].Foto
                    banda.textContent = lista[indexAtual].artista
                    nome.textContent = lista[indexAtual].nome
                    window.history.replaceState(null,null,lista[indexAtual].nome)
                    musicaAtual.play()
                    icon_playPause.classList.replace("fa-play","fa-pause")
                    
                }else{
                    indexAtual++
                    musicaAtual.src = lista[indexAtual].src
                    img.src = lista[indexAtual].Foto
                    banda.textContent = lista[indexAtual].artista
                    nome.textContent = lista[indexAtual].nome
                    window.history.replaceState(null,null,lista[indexAtual].nome)
                    musicaAtual.play()
                    icon_playPause.classList.replace("fa-play","fa-pause")
                    
                }
            })
        }
        })
    })
//troca de icone do botão
playPause.addEventListener('click',()=>{
    if(icon_playPause.classList.contains("fa-play")){
        musicaAtual.play()
        icon_playPause.classList.replace("fa-play","fa-pause")
    } else{
        musicaAtual.pause()
        icon_playPause.classList.replace("fa-pause","fa-play")
    }
})
//barra de progresso
musicaAtual.addEventListener('timeupdate',()=>{
    if(musicaAtual.play){
        progress.max = musicaAtual.duration
        progress.value = musicaAtual.currentTime
    }
})
progress.addEventListener('click',()=>{
    musicaAtual.currentTime = progress.value
})
//função logout
logout.addEventListener('click',()=>{
    logout.src = "/"
    localStorage.removeItem("token")
})