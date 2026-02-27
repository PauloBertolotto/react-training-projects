document.addEventListener("DOMContentLoaded", function () {
  const ofertas = document.querySelector(".ofertas");

  // Criar estrutura principal
  const recomendacao = document.createElement("div");
  recomendacao.className = "recomendacao";

  const recomendacaoDoDia = document.createElement("div");
  recomendacaoDoDia.className = "recomendacao-do-dia";

  const link = document.createElement("a");
  link.href = "#";

  const prodRecomendado = document.createElement("div");
  prodRecomendado.className = "prod-recomendado";

  // Título
  const titulo = document.createElement("h3");
  titulo.textContent = "Oferta do dia";

  // Imagem
  const imagem = document.createElement("img");
  imagem.src = "img/ofertas/recomendacao/furadera.webp";
  imagem.alt = "Parafusadeira e Furadeira";

  // Descrição
  const descricao = document.createElement("p");
  descricao.id = "descricao";
  descricao.textContent = "Parafusadeira E Furadeira De Impacto 3/8 The Black Tools Tb21-pz Com 2 Baterias E Acessorios";

  // Preço antigo
  const oldprice = document.createElement("p");
  oldprice.id = "oldprice";
  oldprice.textContent = "R$ 369,90";

  // Desconto
  const desconto = document.createElement("div");
  desconto.className = "desconto";

  const precoNovo = document.createElement("h2");
  precoNovo.textContent = "R$ 199";

  const porcentagem = document.createElement("p");
  porcentagem.textContent = "46% OFF";

  desconto.appendChild(precoNovo);
  desconto.appendChild(porcentagem);

  // Parcelamento
  const parcela = document.createElement("p");
  parcela.id = "parcela";
  parcela.textContent = "6x R$ 33,17 sem juros";

  // Cupom
  const cupom = document.createElement("p");
  cupom.id = "cupom";
  cupom.textContent = "Cupom R$ 2 OFF";

  // Frete
  const frete = document.createElement("p");
  frete.id = "frete";
  frete.textContent = "Frete grátis";

  // Montar estrutura
  prodRecomendado.appendChild(titulo);
  prodRecomendado.appendChild(imagem);
  prodRecomendado.appendChild(descricao);
  prodRecomendado.appendChild(oldprice);
  prodRecomendado.appendChild(desconto);
  prodRecomendado.appendChild(parcela);
  prodRecomendado.appendChild(cupom);
  prodRecomendado.appendChild(frete);

  link.appendChild(prodRecomendado);
  recomendacaoDoDia.appendChild(link);
  recomendacao.appendChild(recomendacaoDoDia);

  // Div extra (vazia por enquanto)
  const recomendacaoExtra = document.createElement("div");
  recomendacaoExtra.className = "recomendacao-extra";
  recomendacao.appendChild(recomendacaoExtra);

  // Inserir na página
  ofertas.appendChild(recomendacao);
});
// 