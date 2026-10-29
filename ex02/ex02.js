// Exercício 02: Conta de luz
// Conteúdos: switch com cases agrupados, parâmetro padrão, tipos literais
// ---------- Regras de negócio ----------
// Cases agrupados: dois tipos de cliente caem no mesmo bloco
function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.8;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
// A bandeira tem valor padrão: se não for informada, vale 'verde'
function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde':
            return 0;
        case 'amarela':
            return consumo * 0.02;
        case 'vermelha1':
            return consumo * 0.04;
        case 'vermelha2':
            return consumo * 0.08;
    }
}
// As duas bandeiras vermelhas compartilham a mesma mensagem
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'Condições favoráveis de geração de energia.';
        case 'amarela':
            return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'Condições mais caras de geração. Economize!';
        default:
            return 'Bandeira desconhecida.';
    }
}
function nomeBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'verde';
        case 'amarela':
            return 'amarela';
        case 'vermelha1':
            return 'vermelha (patamar 1)';
        case 'vermelha2':
            return 'vermelha (patamar 2)';
    }
}
// Teste do parâmetro padrão:
console.log(adicionalBandeira(100));
// Resultado: 0. Como a bandeira não foi informada, o parâmetro assume o
// valor padrão 'verde', que não tem adicional (R$ 0,00 por kWh).
// ---------- Página ----------
const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const consumo = campoConsumo.valueAsNumber;
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
    if (Number.isNaN(consumo) || consumo <= 0) {
        saida.className = 'erro';
        saida.textContent = 'Informe um consumo válido';
        return;
    }
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    const total = energia + adicional;
    saida.className = bandeira !== 'verde' ? 'alerta' : '';
    saida.textContent =
        `Energia: R$ ${energia.toFixed(2)}\n` +
            `Bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
            `Total: R$ ${total.toFixed(2)}\n` +
            mensagemBandeira(bandeira);
});
export {};
//# sourceMappingURL=ex02.js.map