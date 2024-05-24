//pegando token
var axiosConfig = {
    headers: {
        authorization: "Bearer " + localStorage.getItem("token")
    }
}
//criando link a partir do tamanho de musicas no servidor
axios.get('http://localhost:8081/inicio/musicas',axiosConfig).then((data)=>{
    const lista = data.data
    const div_total = document.querySelector("#musicas")
    const logout = document.querySelector("#logout")
    lista.forEach((musica)=>{
        const divmusic = document.createElement("div")
        divmusic.classList.add("div_music")
        div_total.appendChild(divmusic)
        const imagem_musicas = document.createElement("img")
        imagem_musicas.src = musica.Foto
        imagem_musicas.classList.add("imagem_musicas")
        divmusic.appendChild(imagem_musicas)
        const divdescript = document.createElement("div")
        divdescript.classList.add("divdescript")
        divmusic.appendChild(divdescript)
        const linkmusic = document.createElement("a")
        linkmusic.classList.add("linkmusic")
        divdescript.appendChild(linkmusic)
        linkmusic.href = '/inicio/' + musica.nome
        linkmusic.textContent = musica.nome
        const artistamusicas = document.createElement("h2")
        artistamusicas.classList.add("artistamusicas")
        artistamusicas.textContent = musica.artista
        divdescript.appendChild(artistamusicas)
    })
    logout.addEventListener('click',()=>{
        logout.src = "/"
        localStorage.removeItem("token")
    })
})