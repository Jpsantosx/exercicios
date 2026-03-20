// =============================================================
//  Calculadora - calculos de horas extras
//  Autor: João Pedro
//  Objetivo: Criar uma calculadora de horas extras que permita ao usuário inserir o número de horas trabalhadas, a taxa de pagamento por hora e calcular o total a ser pago pelas horas extras. Além disso, a calculadora deve manter um histórico das operações realizadas, permitindo que o usuário visualize as últimas operações realizadas.
// =============================================================

// -------------------------------
// 1. Selecionar os elementos da página
// -------------------------------
const salariobrutoInput = document.getElementById('salariobruto')
const horasInput = document.getElementById('horas')
const valorhoranormalInput = document.getElementById('valorhoranormal')
const horasextrasfdsInput = document.getElementById('horasextrasfds')
const calcularBtn = document.getElementById('calcular')
const resultadoDiv = document.getElementById('resultado')
const historico = document.getElementById('historico')

// Array principal que armazenará o histórico de operações
let historicoOperacoes = []

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
// Estrutura de repetição forEach para percorrer o array de operações e criar elementos <li> para cada operação, exibindo-as na lista do histórico.
// Função arrow function para gerar o conteúdo de cada item do histórico de forma concisa e clara.
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

// -------------------------------
// 6. Função para calcular o valor das horas extras
// -------------------------------

function calcularHorasExtras() {
    const salariobruto = parseFloat(salariobrutoInput.value)
    const horas = parseFloat(horasInput.value)
    const horasextrasfds = parseFloat(horasextrasfdsInput.value)

    if (isNaN(salariobruto) || isNaN(horas) || isNaN(horasextrasfds)) {
        resultadoDiv.textContent = 'Por favor, insira valores válidos.'
        return
    }

    const valorHora = salariobruto / 200
    const valorhoranormal = valorHora*horas
    const valorHoraExtraFds = valorHora * 1.5
    const totalHorasExtras = (valorhoranormal) + (valorHoraExtraFds * horasextrasfds)
    resultadoDiv.textContent = `Total a pagar por horas extras: R$ ${totalHorasExtras.toFixed(2)}`

    // Adicionar a operação ao histórico
    const operacao = `Salário Bruto: R$ ${salariobruto.toFixed(2)}, Horas Extras: ${horas}, Horas Extras FDS: ${horasextrasfds} => Total: R$ ${totalHorasExtras.toFixed(2)}`
    adicionarAoHistorico(operacao)
}

// --------------------------------

// 7. Adicionar evento de clique ao botão de calcular   
calcularBtn.addEventListener('click', calcularHorasExtras)

// 8. Carregar o histórico de operações ao iniciar a página
carregarHistorico()