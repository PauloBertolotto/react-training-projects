export function criarBuscasCompras() {
  const buscasCompras = document.createElement('div');
  buscasCompras.className = 'buscas-compras';

  const tema = document.createElement('div');
  tema.className = 'tema';
  tema.innerHTML = '<span>Informática</span>';

  const temaEspecifico = document.createElement('div');
  temaEspecifico.className = 'tema-especifico';
  temaEspecifico.innerHTML = '<h2>Componentes para PC</h2>';

  const categorias = document.createElement('div');
  categorias.className = 'categorias';
  categorias.innerHTML = '<h3>Categorias</h3>';

  const lista = [
    'Discos e Acessórios', 'Drives de Disquete', 'Emuladores de Disquete',
    'Fontes de Alimentação', 'Gabinetes de PC e Suportes', 'Memórias RAM',
    'Outros', 'Placas', 'Processadores', 'Refrigeração',
    'Sintonizadores de TV', 'Zip Drives'
  ];

  lista.forEach(texto => {
    const span = document.createElement('span');
    span.textContent = texto;
    categorias.appendChild(span);
  });

  buscasCompras.appendChild(tema);
  buscasCompras.appendChild(temaEspecifico);
  buscasCompras.appendChild(categorias);

  const container = document.querySelector('.container-compras');
  const produtos = container?.querySelector('.produtos');

  if (container && produtos) {
    container.insertBefore(buscasCompras, produtos); // ✅ insere antes de .produtos
  } else {
    console.warn('Estrutura .container-compras ou .produtos não encontrada!');
  }
}