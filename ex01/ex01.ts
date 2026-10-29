// Exercício 01: Situação do aluno no semestre
// Conteúdos: if / else if / else, operadores lógicos, ternário, funções

// ---------- Regras de negócio (sem acesso ao document) ----------

function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

// Notas de 0 a 10 e frequência de 0 a 100, numa única condição com && e ||
function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  return !(
    Number.isNaN(n1) || Number.isNaN(n2) || Number.isNaN(frequencia) ||
    n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || frequencia < 0 || frequencia > 100
  );
}

// A frequência vem primeiro: abaixo de 75% reprova, qualquer que seja a média
function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) {
    return 'Reprovado por falta';
  } else if (media >= 7) {
    return 'Aprovado';
  } else if (media >= 4) {
    const precisa: number = 10 - media;
    return `Exame final (precisa tirar ${precisa.toFixed(1)})`;
  } else {
    return 'Reprovado por nota';
  }
}

// ---------- Página ----------

const campoNome = document.getElementById('nome') as HTMLInputElement;
const campoN1 = document.getElementById('n1') as HTMLInputElement;
const campoN2 = document.getElementById('n2') as HTMLInputElement;
const campoFrequencia = document.getElementById('frequencia') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const nome: string = campoNome.value.trim();
  const n1: number = campoN1.valueAsNumber;
  const n2: number = campoN2.valueAsNumber;
  const frequencia: number = campoFrequencia.valueAsNumber;

  // Retorno antecipado quando os dados são inválidos
  if (!dadosValidos(n1, n2, frequencia)) {
    saida.className = 'erro';
    saida.textContent = 'Dados inválidos';
    return;
  }

  const media: number = calcularMedia(n1, n2);
  const texto: string = situacao(media, frequencia);

  // Ternário para escolher a classe do resultado
  saida.className = texto === 'Aprovado' ? 'sucesso' : 'erro';
  saida.textContent = `${nome}: média ${media.toFixed(1)}. ${texto}`;
});
