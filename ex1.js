// OK 1 - Pegar os valores
// OK 2 - Calcular a Idade
// Com base no ano
// Com mês (EXTRA)
// Com dia (EXTRA)
// OK 3 - Gerar a faixa etária
//   Resultado            Faixa
// 0 à 12                Criança
// 13 à 17                Adolescente
// 18 à 65               Adulto
// Acima de 65         Idoso

// OK 4 - Organizar o objeto pessoa para salvar na lista
// OK 5 - Cadastrar a pessoa na lista
// OK 6 - Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7 - Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8 -  Botão para limpar os registros;

function valores(event) {
    event.preventDefault()
    // Passo 1
    let usuario = osValores()

    // Passo 2
    let suaIdade = calculoIdade(usuario.ano)
    
    // Passo 3
    let faixaEtaria = classificarIdade(suaIdade)

    // Passo 4
    usuario = organizarUsuarios(usuario,suaIdade,faixaEtaria)

    // Passo 5
    cadastroLista(usuario)

    // Passo 7 
    carregarUsuarios()
}


function osValores() {
    let nomeUsuario = document.getElementById("nome").value
    let diaUsuario = document.getElementById("dia-nascimento").value
    let mesUsuario = document.getElementById("mes-nascimento").value
    let anoUsuario = document.getElementById("ano-nascimento").value

    let dadosUsuario = {
        nome : nomeUsuario,
        dia : diaUsuario,
        mes: mesUsuario,
        ano: anoUsuario

    }

    console.log(dadosUsuario)

    return dadosUsuario

}


function calculoIdade (ano){
    let dataAtual = new Date()
    let anoAtual = dataAtual.getFullYear()

    let suaIdade = anoAtual - ano
    console.log(suaIdade)
    return suaIdade
}


function classificarIdade(idade) {
    if(idade <13){
        console.log("Criança")
        return "Criança"
    }else if (idade <18){
        console.log("Adolescente")
        return "Adolescente"
    }else if(idade <65) {
        console.log("Adulto")
        return "Adulto"
    }else {
        console.log("Idoso")
        return "Idoso"
    }
}


function organizarUsuarios(dadosUsuario,idade, faixaEtaria) {
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        idade: idade,
        faixaEtaria:faixaEtaria
    }

    return dadosUsuarioAtualizado
}

function cadastroLista(dadosUsuario) {
    let listaUsuarios = []

    if(localStorage.getItem("usuariosSite") != null){
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosSite"))
    }

    listaUsuarios.push(dadosUsuario)

    localStorage.setItem("usuariosSite", JSON.stringify(listaUsuarios))
}

function carregarUsuarios() {
    let listaCarregada = []

    if(localStorage.getItem("usuariosSite") != null){
        listaCarregada = JSON.parse(localStorage.getItem("usuariosSite"))
    }

    if(listaCarregada.length == 0) {
        document.getElementById("corpo-tabela").innerHTML = `<tr>
        <td coldspan="6"> Nenhum usuario cadastrado </td></tr>`
    }else{
        renderizarUsuarios(listaCarregada)
    }

}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())


function renderizarUsuarios (listaUsuarios) {
    let table = document.getElementById("corpo-tabela")

    let tempo = ""

    listaUsuarios.forEach(usuario => {
        tempo += `<tr>
        <td data-cell="nome">${usuario.nome }</td>
        <td data-cell="data de nascimento">${usuario.dia, usuario.mes, usuario.ano}</td>
        <td data-cell="idade">${usuario.idade}</td>
        <td data-cell="faixa etária">${usuario.faixaEtaria}</td>
    </tr> `
    })

    table.innerHTML = tempo;
}

function deletarUsuarios() {
    // Remove o item do localStorage
    localStorage.removeItem("usuariosSite")
    // Recarrega a página
    window.location.reload()
}