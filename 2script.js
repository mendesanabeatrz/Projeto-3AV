const timer = document.getElementById("timer"); // Visor do cronômetro
const btnIniciar = document.getElementById("iniciar"); // Botão Iniciar/Pausar 
const btnZerar = document.getElementById("Zerar"); // Botão Zerar
const btnMarcar = document.getElementById("Marcar"); // Botão Marcar
const marcacoes = document.getElementById("marcacoes"); // Área de marcações

// Variáveis do cronômetro
let inicio = 0, pausado = 0, rodando = false, intervalo = null; // tempo de início, tempo pausado, estado e intervalo

// Formata ms em HH:MM:SS
function formatar(ms) { // formata milissegundos em hh:mm:ss
    const seg = Math.floor(ms / 1000); // converte para segundos
    const h = String(Math.floor(seg / 3600)).padStart(2, "0"); // horas
    const m = String(Math.floor((seg % 3600) / 60)).padStart(2, "0"); // minutos
    const s = String(seg % 60).padStart(2, "0"); // segundos
    return `${h}:${m}:${s}`; // retorna no formato hh:mm:ss
}

// Atualiza o visor
function atualizar() { // atualiza o visor do cronômetro
    const agora = new Date().getTime(); // tempo atual em ms
    timer.innerText = formatar(agora - inicio + pausado); // calcula o tempo decorrido e atualiza o visor
}

// Iniciar
function iniciar() { // inicia o cronômetro
    if (rodando) return; // se já estiver rodando, não faz nada
    rodando = true; //  marca como rodando
    inicio = new Date().getTime(); // marca o tempo de início
    intervalo = setInterval(atualizar, 100); // atualiza o visor a cada 100 ms
}

// Pausar
function pausar() { // pausa o cronômetro
    if (!rodando) return; // se não estiver rodando, não faz nada
    rodando = false; // marca como pausado
    clearInterval(intervalo); // para o intervalo de atualização
    const agora = new Date().getTime(); // tempo atual em ms
    pausado += agora - inicio; // acumula o tempo pausado

    // Marca a pausa
    const p = document.createElement("p"); //   cria um parágrafo
    p.textContent = timer.innerText; // define o texto como o tempo atual
    marcacoes.appendChild(p); // adiciona a marcação ao visor
}

// Zerar
function zerar() { // zera o cronômetro
    rodando = false; // marca como não rodando
    clearInterval(intervalo); // para o intervalo de atualização
    inicio = 0; // reseta o tempo de início
    pausado = 0; // reseta o tempo pausado
    timer.innerText = "00:00:00"; // reseta o visor
    marcacoes.innerHTML = ""; // limpa as marcações
    btnIniciar.textContent = "Iniciar"; // reseta o texto do botão iniciar
}

// Registrar marcação manual
function registrarMarcacao() { // registra uma marcação manual
    const p = document.createElement("p"); // cria um parágrafo
    p.textContent = timer.innerText; // define o texto como o tempo atual
    marcacoes.appendChild(p); // adiciona a marcação ao visor
}

// Botão Iniciar ↔ Pausar
btnIniciar.addEventListener("click", () => {    // alterna entre iniciar e pausar
    if (!rodando) { // se não estiver rodando
        iniciar();
        btnIniciar.textContent = "Pausar"; // muda o texto do botão para Pausar
    } else {
        pausar();
        btnIniciar.textContent = "Iniciar"; // muda o texto do botão para Iniciar
    }
});

btnZerar.addEventListener("click", zerar); // Botão Zerar
btnMarcar.addEventListener("click", registrarMarcacao); // Botão Marcar

// Atalhos do teclado
document.addEventListener("keydown", e => { // escuta eventos de teclado
    const t = e.key.toLowerCase(); // tecla pressionada em minúsculo
    if (t === "i") btnIniciar.click(); // mesma função que botão iniciar/pausar
    if (t === "p") btnIniciar.click(); // mesma função que botão iniciar/pausar
    if (t === "z") zerar(); // mesma função que botão zerar
    if (t === "m") registrarMarcacao(); // mesma função que botão marcar
});
