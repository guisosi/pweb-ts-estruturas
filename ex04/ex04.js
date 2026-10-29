// Exercício 04: Meta de economia
// Conteúdos: while, break, tipo de função, parâmetro padrão
const LIMITE_MESES = 600; // 50 anos
// ---------- Regras de negócio ----------
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
// Ex.: 19 -> "1 ano e 7 meses", 25 -> "2 anos e 1 mês", 8 -> "8 meses"
const formatarMeses = (meses) => {
    const anos = Math.floor(meses / 12);
    const resto = meses % 12;
    const textoAnos = anos === 1 ? '1 ano' : `${anos} anos`;
    const textoMeses = resto === 1 ? '1 mês' : `${resto} meses`;
    if (anos === 0) {
        return textoMeses;
    }
    if (resto === 0) {
        return textoAnos;
    }
    return `${textoAnos} e ${textoMeses}`;
};
// A taxa tem valor padrão de 0,5% ao mês
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    while (saldo < meta) {
        if (meses >= LIMITE_MESES) {
            break; // meta inalcançável em 50 anos
        }
        meses++;
        // Primeiro o saldo rende, depois entra o depósito
        saldo = saldo * (1 + taxa / 100) + deposito;
        depositado += deposito;
        // Dezembro (mês 12, 24, 36...): 13º salário, depósito em dobro
        if (meses % 12 === 0) {
            saldo += deposito;
            depositado += deposito;
        }
    }
    return { meses, saldo, depositado };
}
// Recebe a função de formatação como parâmetro
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
// ---------- Página ----------
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const meta = campoMeta.valueAsNumber;
    const deposito = campoDeposito.valueAsNumber;
    if (Number.isNaN(meta) || Number.isNaN(deposito) || meta <= 0 || deposito <= 0) {
        saida.className = 'erro';
        saida.textContent = 'Informe valores positivos';
        return;
    }
    // Campo de rendimento vazio: chama sem o terceiro argumento (usa 0,5%)
    const simulacao = campoTaxa.value === ''
        ? calcularMeses(meta, deposito)
        : calcularMeses(meta, deposito, campoTaxa.valueAsNumber);
    if (simulacao.saldo < meta) {
        saida.className = 'erro';
        saida.textContent =
            'Meta inalcançável em 50 anos.\n' +
                exibirValor(`Saldo após ${LIMITE_MESES} meses`, simulacao.saldo, formatarReal);
        return;
    }
    const rendimento = simulacao.saldo - simulacao.depositado;
    saida.className = 'sucesso';
    saida.textContent =
        `Você atinge a meta em ${simulacao.meses} meses (${formatarMeses(simulacao.meses)}).\n` +
            exibirValor('Saldo final', simulacao.saldo, formatarReal) + '\n' +
            exibirValor('Total depositado', simulacao.depositado, formatarReal) + '\n' +
            exibirValor('Rendimento', rendimento, formatarReal);
});
export {};
//# sourceMappingURL=ex04.js.map