import { adicionarAoCarrinho } from '../carrinho.js';

export const catalogoData = [
  {
    imagem: 'img/produtos/SSD1.webp',
    alt: 'SSD 1TB',
    posicao: '1° MAIS VENDIDO',
    descricao: 'Ssd M.2 2280 Nvme Kingston 1tb Nv3 Snv3s/1000g Pci-e Gen 4.0 Formato M.2 2280 Velocidade De Leitura Até 6000 Mb/s E Gravação Até 4000 Mb/s Cor Azul-escuro',
    nota: '4.9',
    compras: '10595',
    valor: '429',
    parcelas: '8x R$ 53,62 sem juros',
    frete: 'Frete grátis'
  }
];

export function criarCatalogo(lista) {
  const catalogo = document.createElement('div');
  catalogo.className = 'catalago';

  lista.forEach(produto => {
    const item = document.createElement('div');
    item.className = 'item';

    const botaoProduto = document.createElement('button');
    botaoProduto.type = 'button';
    botaoProduto.className = 'produto-clicavel';

    // Evento de clique para adicionar ao carrinho
    botaoProduto.addEventListener('click', () => {
      //console.log('Produto clicado:', produto);
      //JSON.parse(localStorage.getItem('carrinho'))
      adicionarAoCarrinho({
        id: produto.alt,
        nome: produto.alt,
        valor: parseFloat(produto.valor),
        imagem: produto.imagem
      });
    });

    const imagemProduto = document.createElement('div');
    imagemProduto.className = 'imagem-produto';
    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = produto.alt;
    imagemProduto.appendChild(img);

    const infoProduto = document.createElement('div');
    infoProduto.className = 'info-produto';

    const posicao = document.createElement('div');
    posicao.className = 'posicao';
    posicao.innerHTML = `<p>${produto.posicao}</p>`;

    const descricao = document.createElement('div');
    descricao.className = 'descricao';
    descricao.innerHTML = `<p>${produto.descricao}</p>`;

    const classificacao = document.createElement('div');
    classificacao.className = 'classificacao';

    const nota = document.createElement('div');
    nota.className = 'nota';
    nota.innerHTML = `<p>${produto.nota}</p>`;

    const stars = document.createElement('div');
    stars.className = 'stars';
    const avaliacao = document.createElement('span');
    avaliacao.className = 'avaliacao';

    for (let i = 0; i < 5; i++) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '14');
      svg.setAttribute('height', '14');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', '#007BFF');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596 0 9.748l8.332-1.73z');

      svg.appendChild(path);
      avaliacao.appendChild(svg);
    }

    stars.appendChild(avaliacao);

    const numeroCompras = document.createElement('div');
    numeroCompras.className = 'numero-compras';
    numeroCompras.innerHTML = `<p>(${produto.compras})</p>`;

    classificacao.appendChild(nota);
    classificacao.appendChild(stars);
    classificacao.appendChild(numeroCompras);

    const valor = document.createElement('div');
    valor.className = 'valor';
    valor.innerHTML = `<p>R$ ${produto.valor}</p>`;

    const parcelas = document.createElement('div');
    parcelas.className = 'parcelas';
    parcelas.innerHTML = `<p>${produto.parcelas}</p>`;

    const frete = document.createElement('div');
    frete.className = 'frete';
    frete.innerHTML = `<p>${produto.frete}</p>`;

    infoProduto.appendChild(posicao);
    infoProduto.appendChild(descricao);
    infoProduto.appendChild(classificacao);
    infoProduto.appendChild(valor);
    infoProduto.appendChild(parcelas);
    infoProduto.appendChild(frete);

    botaoProduto.appendChild(imagemProduto);
    botaoProduto.appendChild(infoProduto);
    item.appendChild(botaoProduto);
    catalogo.appendChild(item);
  });

  const produtos = document.querySelector('.container-compras .produtos');
  if (produtos) {
    produtos.appendChild(catalogo);
  } else {
    console.warn('Elemento .produtos não encontrado dentro de .container-compras!');
  }
}