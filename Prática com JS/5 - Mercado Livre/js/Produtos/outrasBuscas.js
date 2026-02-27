export const outrasBuscasData = [
  {
    popularidade: '1° LUGAR',
    imagem: 'img/produtos/SSD4.webp',
    descricao: 'SSD Lexar 1TB'
  },
  {
    popularidade: '2° LUGAR',
    imagem: 'img/produtos/SSD5.webp',
    descricao: 'SSD Western Digital 500GB'
  }
];

export function criarOutrasBuscas(lista) {
  const outrasBuscas = document.createElement('div');
  outrasBuscas.className = 'outras-buscas';

  const semiTitulo = document.createElement('div');
  semiTitulo.className = 'semi-titulo';
  const h2 = document.createElement('h2');
  h2.textContent = 'Os usuários também buscaram';
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

  outrasBuscas.appendChild(semiTitulo);
  outrasBuscas.appendChild(corpo);

  const produtos = document.querySelector('.container-compras .produtos');
  if (produtos) {
    produtos.appendChild(outrasBuscas);
  } else {
    console.warn('Elemento .produtos não encontrado dentro de .container-compras!');
  }
}