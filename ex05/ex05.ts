// Exercício 05: Caixa do mercado (projeto integrador)
// Conteúdos: parâmetros rest, sobrecarga de funções e todos os anteriores

type Formatador = (valor: number) => string;

const MAX_ITENS: number = 20;
const PERCENTUAL_FIDELIDADE: number = 5;

// ---------- Regras de negócio ----------

const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

// Lê um preço por linha; aceita ponto ou vírgula
function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const linhas: string[] = texto.split('\n');
  const precos: number[] = [];
  let ignorados: number = 0;

  for (let i = 0; i < linhas.length; i++) {
    // No máximo 20 itens: os seguintes são desconsiderados
    if (precos.length >= MAX_ITENS) {
      break;
    }

    const linha: string = linhas[i].trim();

    // Linha vazia: ignora sem contar
    if (linha === '') {
      continue;
    }

    const preco: number = Number(linha.replace(',', '.'));

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
function somarItens(...precos: number[]): number {
  let soma: number = 0;
  for (const preco of precos) {
    soma += preco;
  }
  return Math.round(soma * 100) / 100; // evita 99.99999 por causa do ponto flutuante
}

// Sobrecarga: por percentual (fidelidade) ou por código de cupom
function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, valor: number | string): number {
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

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const campoFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botao = document.getElementById('fechar') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const { precos, ignorados } = lerPrecos(campoItens.value);

  if (precos.length === 0) {
    saida.className = 'erro';
    saida.textContent = 'Nenhum item válido';
    return;
  }

  const subtotal: number = somarItens(...precos);
  const cupom: string = campoCupom.value.trim();
  const linhas: string[] = [];

  const textoIgnorados: string = ignorados === 0
    ? ''
    : ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`;
  linhas.push(`Itens: ${precos.length}${textoIgnorados}`);
  linhas.push(`Subtotal: ${formatarReal(subtotal)}`);

  // Desconto do cupom (só se o campo não estiver vazio)
  let descontoCupom: number = 0;
  if (cupom !== '') {
    descontoCupom = calcularDesconto(subtotal, cupom);
    linhas.push(
      descontoCupom > 0
        ? `Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}`
        : 'Cupom inválido ou não aplicável'
    );
  }

  // Fidelidade: 5% sobre o valor já com o cupom
  const comCupom: number = subtotal - descontoCupom;
  let descontoFidelidade: number = 0;
  if (campoFidelidade.checked) {
    descontoFidelidade = calcularDesconto(comCupom, PERCENTUAL_FIDELIDADE);
    linhas.push(`Fidelidade (${PERCENTUAL_FIDELIDADE}%): - ${formatarReal(descontoFidelidade)}`);
  }

  const total: number = comCupom - descontoFidelidade;
  linhas.push(`Total a pagar: ${formatarReal(total)}`);

  saida.className = 'sucesso';
  saida.textContent = linhas.join('\n');
});
