export const tendenciasData = [
  {
    popularidade: '1° LUGAR',
    imagem: 'img/produtos/SSD2.webp',
    descricao: 'SSD Samsung 500GB'
  },
  {
    popularidade: '2° LUGAR',
    imagem: 'img/produtos/SSD3.webp',
    descricao: 'SSD Crucial 2TB'
  }
];

export function criarTendenciasPopulares(lista) {
  const tendencias = document.createElement('div');
  tendencias.className = 'tendencias';

  const semiTitulo = document.createElement('div');
  semiTitulo.className = 'semi-titulo';
  const h2 = document.createElement('h2');
  h2.textContent = 'As tendências mais populares';
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

  tendencias.appendChild(semiTitulo);
  tendencias.appendChild(corpo);

  const produtos = document.querySelector('.container-compras .produtos');
  if (produtos) {
    produtos.appendChild(tendencias);
  } else {
    console.warn('Elemento .produtos não encontrado dentro de .container-compras!');
  }
}