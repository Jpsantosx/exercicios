// =============================================================
//  Calculadora - calculos de aumento de salario
//  Autor: João Pedro
//  Objetivo: Criar uma calculadora de aumento de salário que permita ao usuário inserir o salário atual, a porcentagem de aumento e calcular o novo salário. Além disso, a calculadora deve manter um histórico das operações realizadas, permitindo que o usuário visualize as últimas operações realizadas.
// =============================================================

// 1. Selecionar os elementos (Adicionei o que faltava)
const salarioFuncionarioInput = document.getElementById('salarioFuncionario');
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

// -------------------------------
// 5. Função para atualizar a exibição do histórico na página.
// -------------------------------

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






// calcular o aumento de salário

function calcularAumento() {
    const salarioAtual = parseFloat(salarioFuncionarioInput.value);
    
    // CRIAMOS A VARIÁVEL AQUI PARA USAR DEPOIS
    let porcentagemAumento = 0; 

    if (isNaN(salarioAtual)) {
        resultadoDiv.textContent = 'Por favor, insira um salário válido.';
        return;
    }

    // LÓGICA CORRIGIDA:
    if (salarioAtual <= 1200) {
        porcentagemAumento = 16;
    } else if (salarioAtual <= 2100) {
        porcentagemAumento = 13;
    } else if (salarioAtual <= 3000) {
        porcentagemAumento = 10;
    } else {
        porcentagemAumento = 5;
    }

    const valorAumento = salarioAtual * (porcentagemAumento / 100);
    const novoSalario = salarioAtual + valorAumento;

    resultadoDiv.textContent = `Novo salário: R$ ${novoSalario.toFixed(2)} (Aumento de R$ ${valorAumento.toFixed(2)})`;

    adicionarAoHistorico(`Salário: R$ ${salarioAtual.toFixed(2)}, Aumento: ${porcentagemAumento}%, Novo: R$ ${novoSalario.toFixed(2)}`);
}

calcularBtn.addEventListener('click', calcularAumento);
carregarHistorico();

atualizarRelogio() // Chamada inicial para exibir o relógio imediatamente ao carregar a página
setInterval(atualizarRelogio, 1000)
