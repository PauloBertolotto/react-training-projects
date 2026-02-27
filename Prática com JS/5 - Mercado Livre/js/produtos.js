import { criarBuscasCompras } from './Produtos/categorias.js';
import { criarBuscasDesejadas } from './Produtos/buscasDesejadas.js';
import { criarTendenciasPopulares } from './Produtos/tendencias.js';
import { criarOutrasBuscas } from './Produtos/outrasBuscas.js';
import { criarCatalogo } from './Produtos/catalogo.js';

import {
  buscasDesejadasData,
  tendenciasData,
  outrasBuscasData,
  catalogoData
} from './Produtos/dados.js';

export function carregarProdutos() {
  const main = document.querySelector('main');
  
  const app = document.getElementById('app');
  app.innerHTML = '';

  const containerCompras = document.createElement('div');
  containerCompras.className = 'container-compras';

  const produtos = document.createElement('div');
  produtos.className = 'produtos';

  containerCompras.appendChild(produtos);
  app.appendChild(containerCompras);

  criarBuscasCompras();

  criarBuscasDesejadas(buscasDesejadasData);
  criarTendenciasPopulares(tendenciasData);
  criarOutrasBuscas(outrasBuscasData);
  criarCatalogo(catalogoData);

  document.body.classList.add('modo-produtos');
}