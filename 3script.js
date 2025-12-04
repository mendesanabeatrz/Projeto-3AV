// Seletores
const campo = document.getElementById("notaTexto"); // Área de texto
const lista = document.getElementById("listaNotas"); // Lista de notas
const btnSalvar = document.getElementById("salvar"); // Botão salvar
const btnEditar = document.getElementById("editar"); // Botão editar
const btnExcluir = document.getElementById("excluir"); // Botão excluir

let indiceSelecionado = null; 

function carregar() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];
    lista.innerHTML = ""; 

    notas.forEach((n, i) => {
        let li = document.createElement("li"); 
        li.textContent = n; 
        li.onclick = () => selecionar(i); 
        lista.appendChild(li); 
    });
}

carregar(); 


btnSalvar.onclick = () => { 
    if (campo.value.trim() === "") 
        return; 

    const notas = JSON.parse(localStorage.getItem("notas")) || []; 
    notas.push(campo.value); 
    localStorage.setItem("notas", JSON.stringify(notas)); 

    campo.value = ""; 
    carregar(); 
};

// Selecionar nota da lista
function selecionar(i) {
    const notas = JSON.parse(localStorage.getItem("notas")); 
    campo.value = notas[i]; 
    indiceSelecionado = i; 
    btnEditar.disabled = false; 
    btnExcluir.disabled = false; 
}

// Editar nota existente
btnEditar.onclick = () => {
    const notas = JSON.parse(localStorage.getItem("notas")); 
    notas[indiceSelecionado] = campo.value;
    localStorage.setItem("notas", JSON.stringify(notas)); 

    campo.value = ""; 
    indiceSelecionado = null; 
    btnEditar.disabled = true; 
    btnExcluir.disabled = true; 

    carregar();
};

// Excluir nota
btnExcluir.onclick = () => {
    if (!confirm("Deseja excluir esta nota?")) return;

    const notas = JSON.parse(localStorage.getItem("notas")); 
    notas.splice(indiceSelecionado, 1); 
    localStorage.setItem("notas", JSON.stringify(notas)); 
    campo.value = "";
    indiceSelecionado = null; 
    btnEditar.disabled = true; 
    btnExcluir.disabled = true;

    carregar(); 
};
