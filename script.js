function alerta(params) {
    alert(params)  
}

function escreva(params) {
    console.log(params)
}

async function executar() {
        const title = document.getElementById("titulo").value
        const description = document.getElementById("descricao").value
        let validacao = validar(title, description)
        mensagem_validacao(validacao)
        if (validacao == true) {
            vetor = preparacao(title, description)
            let resposta = await mandar(vetor)
            let mensagem_cadastro = await resposta.json()
        alerta(mensagem_cadastro)
        }
    }

async function listar() {
    let lista_livros = await load_livros()
    apresentar_livros(lista_livros)
}

function mensagem_validacao(a) {
    if (a == true) {
        document.getElementById("mensagem").style.display = "block"
        document.getElementById("invalido").style.display = "none"
    } else {
        document.getElementById("mensagem").style.display = "none"
        document.getElementById("invalido").style.display = "block"
    }
    return
}

function validar(a, b) {
    if (a == "" || b == "") {
        return false
    } else {
        return true
    }
}

function preparacao(a, b) {
    const url = "https://target-api-simples.cyclic.app/livros"
    const c = {
        "title": a,
        "description": b
    }
    let vetor = Array(2)
    vetor[0] = url
    vetor[1] = c
    return vetor 
}

async function mandar(a) {
    const resposta = await fetch(a[0], {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(a[1])
    })
    return resposta
}

async function load_livros() {
        const url = `https://target-api-simples.cyclic.app/livros`
        const response = await fetch(url)
        return response.json()
    }

/*
function apresentar_livros(listar_livros) {
    let elementoHTML = document.getElementById("lista_livros")
    let texto = ""
    for (let i = 0; i < listar_livros.length; i++) {
        texto += `
            <div class="lista">
                ${listar_livros[i].id} ${listar_livros[i].title} ${listar_livros[i].description} <br>
            </div>
        `
    }
    elementoHTML.innerHTML = texto
}
*/

/*
function apresentar_livros(listar_livros) {
    let elementoHTML = document.getElementById("lista_livros")
    let texto = ""
    for (let i = 0; i < listar_livros.length; i++) {
        texto += `
            <div class="card">
                ${listar_livros[i].id} <br>
                ${listar_livros[i].title} <br>
                ${listar_livros[i].description} <br>
            </div>
        `
    }
    elementoHTML.innerHTML = texto
}
*/

function apresentar_livros(listar_livros) {
    let elementoHTML = document.getElementById("lista_livros")
    let inicioTabela = `
        <table border="2">
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descrição</th>
            </tr>
        </thead>
        <tbody>
    `
    let linhasDoCorpo = ""
    for (let i = 0; i < listar_livros.length; i++) {
        linhasDoCorpo += `
        <tr>
            <td>${listar_livros[i].id}</td>
            <td>${listar_livros[i].title}</td>
            <td>${listar_livros[i].description}</td>
        </tr>
        `
    }
    let fimTabela = `
        </tbody>
    </table>
    `
    const texto = inicioTabela + linhasDoCorpo + fimTabela
    elementoHTML.innerHTML = texto
}