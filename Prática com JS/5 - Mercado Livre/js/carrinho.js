let carrinho = carregarCarrinhoDoStorage();

function salvarCarrinhoNoStorage() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinhoDoStorage() {
  const salvo = localStorage.getItem('carrinho');
  return salvo ? JSON.parse(salvo) : [];
}


export function adicionarAoCarrinho(produto) {

  carrinho = carrinho.map(produtoDoCarrinho => {
    if (produtoDoCarrinho.id === produto.id) {
      return {...produtoDoCarrinho, quantidade: produtoDoCarrinho.quantidade + 1};
    } else {
      return {...produto, quantidade: 1};
    }
  });
  
  const existente = carrinho.find(item => item.id === produto.id);
  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }
  salvarCarrinhoNoStorage();
}

export function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  salvarCarrinhoNoStorage();
  renderizarCarrinho();
}

export function alterarQuantidade(id, novaQuantidade) {
  const item = carrinho.find(p => p.id === id);
  if (item && novaQuantidade > 0) {
    item.quantidade = novaQuantidade;
  } else {
    removerDoCarrinho(id);
  }
  salvarCarrinhoNoStorage();
  renderizarCarrinho();
}

function calcularTotal() {
  return carrinho.reduce((total, item) => total + item.valor * item.quantidade, 0);
}

export function renderizarCarrinho() {
  const container = document.getElementById('carrinho-itens');
  const total = document.getElementById('carrinho-total');
  if (!container || !total) return;

  container.innerHTML = '';
  total.innerHTML = '';

  if (carrinho.length === 0) {
    container.innerHTML = '<p>Carrinho vazio</p>';
    return;
  }

  carrinho.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-carrinho';
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="item-carrinho-info">
        <p><strong>${item.nome}</strong></p>
        <p>Preço: R$ ${item.valor.toFixed(2)}</p>
        <p>Quantidade: <input type="number" min="1" value="${item.quantidade}" data-id="${item.id}" /></p>
        <button data-id="${item.id}" class="remover">Remover</button>
      </div>
    `;
    container.appendChild(div);
  });

  total.innerHTML = `<p>Total: R$ ${calcularTotal().toFixed(2)}</p>`;

  container.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const novaQuantidade = parseInt(e.target.value);
      alterarQuantidade(id, novaQuantidade);
    });
  });

  container.querySelectorAll('.remover').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      removerDoCarrinho(id);
    });
  });

}