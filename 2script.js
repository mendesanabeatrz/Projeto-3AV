const timer = document.getElementById("timer");
const btnIniciar = document.getElementById("iniciar");  
const btnZerar = document.getElementById("Zerar"); 
const btnMarcar = document.getElementById("Marcar"); 
const marcacoes = document.getElementById("marcacoes"); 

// Variáveis do cronômetro
let inicio = 0, pausado = 0, rodando = false, intervalo = null; 

// Formata ms em HH:MM:SS
function formatar(ms) { 
    const seg = Math.floor(ms / 1000); 
    const h = String(Math.floor(seg / 3600)).padStart(2, "0"); 
    const m = String(Math.floor((seg % 3600) / 60)).padStart(2, "0"); 
    const s = String(seg % 60).padStart(2, "0"); // segundos
    return `${h}:${m}:${s}`; // retorna no formato hh:mm:ss
}

// Atualiza o visor
function atualizar() { 
    const agora = new Date().getTime(); 
    timer.innerText = formatar(agora - inicio + pausado); 
}

// Iniciar
function iniciar() { 
    if (rodando) return; 
    rodando = true; 
    inicio = new Date().getTime(); 
    intervalo = setInterval(atualizar, 100); 
}

// Pausar
function pausar() { 
    if (!rodando) return; 
    rodando = false; 
    clearInterval(intervalo);
    const agora = new Date().getTime(); 
    pausado += agora - inicio; 

    // Marca a pausa
    const p = document.createElement("p"); 
    p.textContent = timer.innerText; 
    marcacoes.appendChild(p); 
}

// Zerar
function zerar() { 
    rodando = false; 
    clearInterval(intervalo); 
    inicio = 0; 
    pausado = 0; 
    timer.innerText = "00:00:00"; 
    marcacoes.innerHTML = ""; 
    btnIniciar.textContent = "Iniciar"; 
}

// Registrar marcação manual
function registrarMarcacao() { 
    const p = document.createElement("p"); 
    p.textContent = timer.innerText; 
    marcacoes.appendChild(p); 
}

// Botão Iniciar Pausar
btnIniciar.addEventListener("click", () => {    
    if (!rodando) { // se não estiver rodando
        iniciar();
        btnIniciar.textContent = "Pausar"; 
    } else {
        pausar();
        btnIniciar.textContent = "Iniciar";
    }
});

btnZerar.addEventListener("click", zerar); 
btnMarcar.addEventListener("click", registrarMarcacao); 

// Atalhos do teclado
document.addEventListener("keydown", e => { 
    const t = e.key.toLowerCase(); 
    if (t === "i") btnIniciar.click(); 
    if (t === "p") btnIniciar.click(); 
    if (t === "z") zerar();
    if (t === "m") registrarMarcacao(); 
});
