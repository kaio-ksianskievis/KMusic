//pegando os inputs
const email= document.querySelector('#email')
const senha= document.querySelector('#senha')
//consumindo a rota para guardar o token
function envia(){
    axios.post("http://localhost:8081/auth",{email: email.value, senha: senha.value}).then((data)=>{
        if(data.data!= undefined && data.data!= 'senha ou email incorretos'){
            localStorage.setItem("token",data.data.token)
        }else{
            alert('Email ou senha inválidos')
        }
    }).catch(()=>{
        alert('Email ou senha inválidos')
    })
}