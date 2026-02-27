export const buscasDesejadasData = [
  {
    popularidade: '1° LUGAR',
    imagem: 'img/logo.png',
    descricao: 'Logo do Mercado Livre'
  },
  {
    popularidade: '2° LUGAR',
    imagem: 'img/produtos/SSD1.webp',
    descricao: 'SSD Kingston 1TB'
  }
];

export function criarBuscasDesejadas(lista) {
  const buscasDesejadas = document.createElement('div');
  buscasDesejadas.className = 'buscas-desejadas';

  const semiTitulo = document.createElement('div');
  semiTitulo.className = 'semi-titulo';
  const h2 = document.createElement('h2');
  h2.textContent = 'As buscas mais desejadas';
  semiTitulo.appendChild(h2);

  const corpo = document.createElement('div');
  corpo.className = 'corpo';

  lista.forEach(item => {
    const produtosRecomendados = document.createElement('div');
    produtosRecomendados.className = 'produtos-recomendados';

    const popularidade = document.createElement('div');
    popularidade.className = 'popularidade';
    const pPopularidade = document.createElement('p');
    pPopularidade.textContent = item.popularidade;
    popularidade.appendChild(pPopularidade);

    const packImagem = document.createElement('div');
    packImagem.className = 'pack-imagem';

    const img = document.createElement('img');
    img.src = item.imagem;
    img.alt = item.descricao;

    const pDescricao = document.createElement('p');
    pDescricao.textContent = item.descricao;

    packImagem.appendChild(img);
    packImagem.appendChild(pDescricao);

    produtosRecomendados.appendChild(popularidade);
    produtosRecomendados.appendChild(packImagem);
    corpo.appendChild(produtosRecomendados);
  });

  buscasDesejadas.appendChild(semiTitulo);
  buscasDesejadas.appendChild(corpo);

  const produtos = document.querySelector('.container-compras .produtos');
  if (produtos) {
    produtos.appendChild(buscasDesejadas);
  } else {
    console.warn('Elemento .produtos não encontrado dentro de .container-compras!');
  }
}