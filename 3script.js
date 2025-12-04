// Seletores
const campo = document.getElementById("notaTexto"); // Área de texto
const lista = document.getElementById("listaNotas"); // Lista de notas
const btnSalvar = document.getElementById("salvar"); // Botão salvar
const btnEditar = document.getElementById("editar"); // Botão editar
const btnExcluir = document.getElementById("excluir"); // Botão excluir

let indiceSelecionado = null; // Índice da nota selecionada

// Carregar notas ao abrir
function carregar() {
    const notas = JSON.parse(localStorage.getItem("notas")) || []; // Recupera notas do localStorage
    lista.innerHTML = ""; // Limpa lista atual

    notas.forEach((n, i) => {
        let li = document.createElement("li"); // Cria item da lista
        li.textContent = n; // Define texto do item
        li.onclick = () => selecionar(i); // Define ação ao clicar
        lista.appendChild(li); // Adiciona item à lista
    });
}

carregar(); // Chama função para carregar notas

// Salvar nova nota
btnSalvar.onclick = () => { // Ao clicar em salvar
    if (campo.value.trim() === "") return; // Ignora se o campo estiver vazio

    const notas = JSON.parse(localStorage.getItem("notas")) || []; // Recupera notas existentes
    notas.push(campo.value); // Adiciona nova nota
    localStorage.setItem("notas", JSON.stringify(notas)); // Salva de volta no localStorage

    campo.value = ""; // Limpa campo de texto
    carregar(); // Recarrega lista de notas
};

// Selecionar nota da lista
function selecionar(i) {
    const notas = JSON.parse(localStorage.getItem("notas")); // Recupera notas
    campo.value = notas[i]; // Preenche campo com a nota selecionada

    indiceSelecionado = i; // Atualiza índice selecionado
    btnEditar.disabled = false; // Habilita botões editar e excluir
    btnExcluir.disabled = false; // Habilita botões editar e excluir
}

// Editar nota existente
btnEditar.onclick = () => {
    const notas = JSON.parse(localStorage.getItem("notas")); // Recupera notas
    notas[indiceSelecionado] = campo.value; // Atualiza nota no índice selecionado
    localStorage.setItem("notas", JSON.stringify(notas)); // Salva de volta no localStorage

    campo.value = ""; // Limpa campo de texto
    indiceSelecionado = null; // Reseta índice selecionado
    btnEditar.disabled = true; // Desabilita botões editar e excluir
    btnExcluir.disabled = true; // Desabilita botões editar e excluir

    carregar();
};

// Excluir nota
btnExcluir.onclick = () => {
    if (!confirm("Deseja excluir esta nota?")) return; // Confirmação de exclusão

    const notas = JSON.parse(localStorage.getItem("notas")); // Recupera notas
    notas.splice(indiceSelecionado, 1); // Remove nota no índice selecionado
    localStorage.setItem("notas", JSON.stringify(notas)); // Salva de volta no localStorage

    campo.value = "";
    indiceSelecionado = null; // Reseta índice selecionado
    btnEditar.disabled = true; // Desabilita botões editar e excluir
    btnExcluir.disabled = true; // Desabilita botões editar e excluir

    carregar(); // Recarrega lista de notas
};
