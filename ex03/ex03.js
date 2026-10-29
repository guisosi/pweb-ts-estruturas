// Exercício 03: Simulador de parcelamento
// Conteúdos: for, break, continue, parâmetro opcional
const PARCELA_MINIMA = 50;
const TAXA_JUROS = 0.02;
// ---------- Regras de negócio ----------
// Até 3 parcelas sem juros; a partir de 4, juros compostos de 2% ao mês
function calcularTotal(valor, parcelas) {
    if (parcelas <= 3) {
        return valor;
    }
    return valor * (1 + TAXA_JUROS) ** parcelas;
}
// A entrada é opcional: quando não é informada, vale undefined
function simularParcelamento(preco, entrada) {
    const financiado = typeof entrada !== 'undefined' ? preco - entrada : preco;
    let linhas = '';
    for (let parcelas = 1; parcelas <= 12; parcelas++) {
        // A loja não oferece 7, 8, 9 e 11 parcelas
        if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
            continue;
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        // Parcela abaixo do mínimo: as opções acabam
        if (valorParcela < PARCELA_MINIMA) {
            break;
        }
        const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
        linhas +=
            `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
                `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
// ---------- Página ----------
const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botao = document.getElementById('simular');
const saida = document.getElementById('resultado');
const tabela = document.getElementById('parcelas');
botao.addEventListener('click', () => {
    const preco = campoPreco.valueAsNumber;
    tabela.innerHTML = '';
    if (Number.isNaN(preco) || preco <= 0) {
        saida.className = 'erro';
        saida.textContent = 'Informe um preço válido';
        return;
    }
    // Campo de entrada vazio: chama sem o segundo argumento
    if (campoEntrada.value === '') {
        saida.className = '';
        saida.textContent = `Valor financiado: R$ ${preco.toFixed(2)}`;
        tabela.innerHTML = simularParcelamento(preco);
        return;
    }
    const entrada = campoEntrada.valueAsNumber;
    if (entrada >= preco) {
        saida.className = 'alerta';
        saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
        return;
    }
    saida.className = '';
    saida.textContent = `Valor financiado: R$ ${(preco - entrada).toFixed(2)}`;
    tabela.innerHTML = simularParcelamento(preco, entrada);
});
export {};
//# sourceMappingURL=ex03.js.map