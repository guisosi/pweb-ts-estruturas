// Exercício 05: Caixa do mercado (projeto integrador)
// Conteúdos: parâmetros rest, sobrecarga de funções e todos os anteriores
const MAX_ITENS = 20;
const PERCENTUAL_FIDELIDADE = 5;
// ---------- Regras de negócio ----------
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
// Lê um preço por linha; aceita ponto ou vírgula
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        // No máximo 20 itens: os seguintes são desconsiderados
        if (precos.length >= MAX_ITENS) {
            break;
        }
        const linha = linhas[i].trim();
        // Linha vazia: ignora sem contar
        if (linha === '') {
            continue;
        }
        const preco = Number(linha.replace(',', '.'));
        // Linha inválida (não é número ou é <= 0): ignora e conta
        if (Number.isNaN(preco) || preco <= 0) {
            ignorados++;
            continue;
        }
        precos.push(preco);
    }
    return { precos, ignorados };
}
// Parâmetro rest: recebe quantos preços forem passados
function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return Math.round(soma * 100) / 100; // evita 99.99999 por causa do ponto flutuante
}
function calcularDesconto(total, valor) {
    if (typeof valor === 'number') {
        return (total * valor) / 100;
    }
    switch (valor.toUpperCase()) {
        case 'BEMVINDO':
            return total * 0.1;
        case 'PROMO20':
            return total * 0.2;
        case 'MENOS15':
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
// ---------- Página ----------
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(campoItens.value);
    if (precos.length === 0) {
        saida.className = 'erro';
        saida.textContent = 'Nenhum item válido';
        return;
    }
    const subtotal = somarItens(...precos);
    const cupom = campoCupom.value.trim();
    const linhas = [];
    const textoIgnorados = ignorados === 0
        ? ''
        : ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`;
    linhas.push(`Itens: ${precos.length}${textoIgnorados}`);
    linhas.push(`Subtotal: ${formatarReal(subtotal)}`);
    // Desconto do cupom (só se o campo não estiver vazio)
    let descontoCupom = 0;
    if (cupom !== '') {
        descontoCupom = calcularDesconto(subtotal, cupom);
        linhas.push(descontoCupom > 0
            ? `Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}`
            : 'Cupom inválido ou não aplicável');
    }
    // Fidelidade: 5% sobre o valor já com o cupom
    const comCupom = subtotal - descontoCupom;
    let descontoFidelidade = 0;
    if (campoFidelidade.checked) {
        descontoFidelidade = calcularDesconto(comCupom, PERCENTUAL_FIDELIDADE);
        linhas.push(`Fidelidade (${PERCENTUAL_FIDELIDADE}%): - ${formatarReal(descontoFidelidade)}`);
    }
    const total = comCupom - descontoFidelidade;
    linhas.push(`Total a pagar: ${formatarReal(total)}`);
    saida.className = 'sucesso';
    saida.textContent = linhas.join('\n');
});
export {};
//# sourceMappingURL=ex05.js.map