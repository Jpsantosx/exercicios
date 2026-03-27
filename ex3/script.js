// =============================================================
//  Calculadora - TRANSPORTE DE COLABORADORES
//  Autor: João Pedro
//  Objetivo: Criar uma calculadora de transporte de colaboradores que permita ao usuário inserir as informações necessárias e calcular o valor do transporte.
// =============================================================

// 1. Selecionar os elementos (Adicionei o que faltava)
const contidadeFuncionariosInput = document.getElementById('contidadeFuncionarios');
const quantosdiasInput = document.getElementById('quantosdias');
const calcularBtn = document.getElementById('calcular');
const resultadoDiv = document.getElementById('resultado');
const historico = document.getElementById('historico');

let historicoOperacoes = [];
// Array principal que armazenará o histórico de operações


// -------------------------------
// 2. Carregar histórico de operações salvos no navegador (localStorage)
// -------------------------------
function carregarHistorico() {
    const historicoSalvo = localStorage.getItem('historicoOperacoes')
    if (historicoSalvo) {
        historicoOperacoes = JSON.parse(historicoSalvo)
        atualizarHistorico()
    }
}

// -------------------------------
// 3. Salvar histórico de operações no navegador
// -------------------------------
function salvarHistorico() {
    localStorage.setItem('historicoOperacoes', JSON.stringify(historicoOperacoes))
}

// -------------------------------
// 4. Função para adicionar uma nova operação ao histórico
// -------------------------------
function adicionarAoHistorico(operacao) {
    historicoOperacoes.push(operacao)
    salvarHistorico()
    atualizarHistorico()
}



function atualizarHistorico() {
    historico.innerHTML = ''
    historicoOperacoes.forEach( (operacao) => {
        const li = document.createElement('li')
        li.textContent = operacao
        historico.appendChild(li)
    })
}

// apagar o histórico
const limparHistoricoBtn = document.getElementById('limparHistorico')
limparHistoricoBtn.addEventListener('click', () => {
    historicoOperacoes = []
    salvarHistorico()
    atualizarHistorico()
})

//hora atual

function atualizarRelogio() {

    const agora = new Date();

    const dataFormatada = agora.toLocaleDateString('pt-BR');

    const horaFormatada = agora.toLocaleTimeString('pt-BR');

    const elementoDataHora = document.getElementById('relogio-digital');

    elementoDataHora.innerHTML = `${dataFormatada} ${horaFormatada}`;
}






// calcular o valor do transporte
function calcularTransporte() {
    const quantidadeFuncionarios = parseInt(contidadeFuncionariosInput.value)
    
    // CRIAMOS A VARIÁVEL AQUI PARA USAR DEPOIS
    let valorTransporte = 0; 

    if (isNaN(quantidadeFuncionarios)) {
        resultadoDiv.textContent = 'Por favor, insira uma quantidade válida de funcionários.';
        return;
    }

    if (quantidadeFuncionarios =>1) {
        valorTransporte = quantidadeFuncionarios * 4,50
    } else if (quantidadeFuncionarios => 50) {
        valorTransporte = quantidadeFuncionarios * 4,10
    } else if (quantidadeFuncionarios => 100) {
        valorTransporte = quantidadeFuncionarios * 3,80
    } else if (quantidadeFuncionarios => 150) {
        valorTransporte = quantidadeFuncionarios * 3,50}


    valorFinal = valorTransporte * quantosdiasInput.value

    resultadoDiv.textContent = `Valor total do transporte: R$ ${valorFinal.toFixed(2)}`

     

    // Adicionar a operação ao histórico
    const operacao = `Quantidade de funcionários: ${quantidadeFuncionarios} - Valor do transporte: R$ ${valorTransporte.toFixed(2)} - quantidade de dias: ${quantosdiasInput.value} - valor final: R$ ${valorFinal.toFixed(2)}`
    adicionarAoHistorico(operacao)
}

// Evento de clique para calcular o transporte
calcularBtn.addEventListener('click', calcularTransporte)


atualizarRelogio() // Chamada inicial para exibir o relógio imediatamente ao carregar a página
setInterval(atualizarRelogio, 1000)




