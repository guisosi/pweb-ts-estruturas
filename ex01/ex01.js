// Exercício 01: Situação do aluno no semestre
// Conteúdos: if / else if / else, operadores lógicos, ternário, funções
// ---------- Regras de negócio (sem acesso ao document) ----------
function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
// Notas de 0 a 10 e frequência de 0 a 100, numa única condição com && e ||
function dadosValidos(n1, n2, frequencia) {
    return !(Number.isNaN(n1) || Number.isNaN(n2) || Number.isNaN(frequencia) ||
        n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || frequencia < 0 || frequencia > 100);
}
// A frequência vem primeiro: abaixo de 75% reprova, qualquer que seja a média
function situacao(media, frequencia) {
    if (frequencia < 75) {
        return 'Reprovado por falta';
    }
    else if (media >= 7) {
        return 'Aprovado';
    }
    else if (media >= 4) {
        const precisa = 10 - media;
        return `Exame final (precisa tirar ${precisa.toFixed(1)})`;
    }
    else {
        return 'Reprovado por nota';
    }
}
// ---------- Página ----------
const campoNome = document.getElementById('nome');
const campoN1 = document.getElementById('n1');
const campoN2 = document.getElementById('n2');
const campoFrequencia = document.getElementById('frequencia');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const nome = campoNome.value.trim();
    const n1 = campoN1.valueAsNumber;
    const n2 = campoN2.valueAsNumber;
    const frequencia = campoFrequencia.valueAsNumber;
    // Retorno antecipado quando os dados são inválidos
    if (!dadosValidos(n1, n2, frequencia)) {
        saida.className = 'erro';
        saida.textContent = 'Dados inválidos';
        return;
    }
    const media = calcularMedia(n1, n2);
    const texto = situacao(media, frequencia);
    // Ternário para escolher a classe do resultado
    saida.className = texto === 'Aprovado' ? 'sucesso' : 'erro';
    saida.textContent = `${nome}: média ${media.toFixed(1)}. ${texto}`;
});
export {};
//# sourceMappingURL=ex01.js.map