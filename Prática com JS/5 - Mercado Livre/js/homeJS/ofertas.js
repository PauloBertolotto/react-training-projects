export function criarOfertas() {
  const ofertas = document.createElement("div");
  ofertas.className = "ofertas";

  ofertas.innerHTML = `
    <div class="recomendacao">
      <div class="recomendacao-do-dia">
        <a href="#">
          <div class="prod-recomendado">
            <h3>Oferta do dia</h3>
            <img src="img/ofertas/recomendacao/furadera.webp" alt="">
            <p id="descricao">Parafusadeira E Furadeira De Impacto 3/8 The Black Tools Tb21-pz Com 2 Baterias E Acessorios</p>
            <p id="oldprice">R$ 369,90</p>
            <div class="desconto">
              <div class="newprice"><h2>R$ 199</h2></div>
              <div class="off"><p>46% OFF</p></div>
            </div>
            <p id="parcela">6x R$ 33,17 sem juros</p>
            <p id="cupom">Cupom R$ 2 OFF</p>
            <p id="frete">Frete grátis</p>
          </div>
        </a>
      </div>

      <div class="recomendacao-extra">
        <div class="linkOfertas">
          <div><h3>Ofertas</h3></div>
          <div id="linkofertas"><a href="#">Mostrar todas as ofertas</a></div>
        </div>

        <div class="ofertasGerais">
          ${[
            {
              img: "camisaLacoste.webp",
              descricao: "Camiseta Clássica Com Estampa de Algodão",
              old: "R$ 329",
              new: "R$ 149",
              off: "54% OFF",
              parcela: "5x R$ 33,33 sem juros",
              cupom: "Cupom 10% OFF",
              frete: "Frete grátis"
            },
            {
              img: "toalhaDeBanho.webp",
              descricao: "Kit 5 Toalhas Banho Gigante Grossa Hotel Luxo 75x159cm-440g",
              old: "R$ 105,29",
              new: "R$ 142",
              off: "23% OFF",
              parcela: "4x R$ 35,67 sem juros",
              cupom: "Cupom 5% OFF",
              frete: "Frete grátis"
            },
            {
              img: "tenisKappa.webp",
              descricao: "Tênis Kappa Pulse Masculino Academia Corrida Confortável",
              old: "R$ 219,99",
              new: "R$ 165",
              off: "24% OFF",
              parcela: "6x R$ 33,18 sem juros",
              cupom: "Cupom 10% OFF",
              frete: "Frete grátis"
            },
            {
              img: "armaDeGel.webp",
              descricao: "Arma Bolinha De Gel Arminha Ak47 Metralhadora Automática",
              old: "R$ 99,90",
              new: "R$ 47,49",
              off: "52% OFF",
              parcela: "12x R$ 4,68",
              cupom: "Cupom R$ 5 OFF",
              frete: "Frete grátis"
            }
          ]
            .map(prod => `
              <div class="varias-recomendacoes">
                <a href="#">
                  <div class="prod-recomendado-extra">
                    <img src="img/ofertas/recomendacao-extra/${prod.img}" alt="">
                    <p id="descricao">${prod.descricao}</p>
                    <p id="oldprice">${prod.old}</p>
                    <div class="desconto">
                      <div class="newprice"><h2>${prod.new}</h2></div>
                      <div class="off"><p>${prod.off}</p></div>
                    </div>
                    <p id="parcela">${prod.parcela}</p>
                    <p id="cupom">${prod.cupom}</p>
                    <p id="frete">${prod.frete}</p>
                  </div>
                </a>
              </div>
            `)
            .join("")}
        </div>
      </div>
    </div>
  `;

  return ofertas;
}

export function criarOutrasOfertas() {
  const ofertas = document.createElement("div");
  ofertas.className = "ofertas";

  ofertas.innerHTML = `
    <div class="recomendacao">
      <div class="recomendacao-extra">
        <div class="linkOfertas">
          <div><h3>Mais vendidos da semana em Fantasias Completas</h3></div>
          <div id="linkofertas"><a href="#">Ir para Mais vendidos</a></div>
        </div>

        <div class="ofertasGerais">
          ${[
            {
              img: "fada.webp",
              descricao: "Kit Fantasia Borboleta Fada Infantil Asa Varinha Tiara Saia",
              old: "",
              new: "R$ 149",
              off: "",
              parcela: "12x R$ 3,53",
              cupom: "sem Cupom",
              frete: "Frete grátis"
            },
            {
              img: "frozen1.webp",
              descricao: "Fantasia Vestido Infantil Elsa Frozen Com Capa E Acessórios",
              old: "R$ 169,90",
              new: "R$ 62",
              off: "63% OFF",
              parcela: "12x R$ 6,19",
              cupom: "sem Cupom",
              frete: "Frete grátis"
            },
            {
              img: "frozen2.webp",
              descricao: "Fantasia Infantil Frozen Vestido Elsa + Kit De Acessórios",
              old: "R$ 159,90",
              new: "R$ 68",
              off: "57% OFF",
              parcela: "12x R$ 6,77",
              cupom: "Cupom 5% OFF",
              frete: "Frete grátis"
            },
            {
              img: "frozen3.webp",
              descricao: "Fantasia Frozen Vestido Infantil Luxo Elsa Com Acessórios",
              old: "R$ 78,35",
              new: "R$ 74",
              off: "5% OFF",
              parcela: "12x R$ 7,33",
              cupom: "Cupom 10% OFF",
              frete: "Frete grátis"
            },
            {
              img: "capa-de-bruxa.png",
              descricao: "Capa De Bruxa Vampiro Drácula Halloween Capuz Adulto Luxo",
              old: "R$ 59,99",
              new: "R$ 19,99",
              off: "66% OFF",
              parcela: "",
              cupom: "Cupom R$ 5 OFF",
              frete: "Frete grátis"
            },
            {
              img: "unicornio.webp",
              descricao: "Fantasia Infantil Menina Vestido Asa Tiara Festa Unicórnio",
              old: "R$ 129,99",
              new: "R$ 78",
              off: "39% OFF",
              parcela: "12x R$ 7,78",
              cupom: "sem Cupom",
              frete: "Frete grátis"
            }
          ]
            .map(prod => `
              <div class="varias-recomendacoes">
                <a href="#">
                  <div class="prod-recomendado-extra">
                    <img src="img/ofertas/OutrasRecomendacoes/fantasias/${prod.img}" alt="">
                    <p id="descricao">${prod.descricao}</p>
                    <p id="oldprice">${prod.old}</p>
                    <div class="desconto">
                      <div class="newprice"><h2>${prod.new}</h2></div>
                      <div class="off"><p>${prod.off}</p></div>
                    </div>
                    <p id="parcela">${prod.parcela}</p>
                    <p id="cupom">${prod.cupom}</p>
                    <p id="frete">${prod.frete}</p>
                  </div>
                </a>
              </div>
            `)
            .join("")}
        </div>
      </div>
    </div>
  `;

  return ofertas;
}

export function criarOutrasOfertas2() {
  const ofertas = document.createElement("div");
  ofertas.className = "ofertas";

  ofertas.innerHTML = `
    <div class="recomendacao">
      <div class="recomendacao-extra">
        <div class="linkOfertas">
          <div><h3>Mais vendidos da semana em Bonecas, Bonecos e Bebês</h3></div>
          <div id="linkofertas"><a href="#">Ir para Mais vendidos</a></div>
        </div>

        <div class="ofertasGerais">
          ${[
            {
              img: "stitch.webp",
              descricao: "Boneco Stitch Coleção Amor De Filhote Roma - 5175",
              old: "78,97",
              new: "R$ 69",
              off: "11% OFF",
              parcela: "12x R$ 6,89",
              cupom: "Cupom R$ 5 OFF",
              frete: "Frete grátis"
            },
            {
              img: "boneca.webp",
              descricao: "Boneca Emilly Vick Dos Rosa Youtuber Vinil 25cm - Baby Brink - Original",
              old: "R$ 149,99",
              new: "R$ 131",
              off: "12% OFF",
              parcela: "12x R$ 13,03",
              cupom: "Cupom R$ 10 OFF",
              frete: "Frete grátis"
            },
            {
              img: "casinha.webp",
              descricao: "Sylvanian Families Primeira Casa 5567 Epoch",
              old: "",
              new: "R$ 189",
              off: "57% OFF",
              parcela: "12x R$ 18,66",
              cupom: "sem Cupom",
              frete: "Frete grátis"
            },
            {
              img: "mesa1.webp",
              descricao: "Mesa Infantil Didática Divertida Play Time Vermelha Cotiplás",
              old: "",
              new: "R$ 59",
              off: "",
              parcela: "12x R$ 5,90",
              cupom: "Cupom R$ 5 OFF",
              frete: "Frete grátis"
            },
            {
              img: "boneca2.webp",
              descricao: "Brastoy Bebê Reborn Bonecas Realista de silicone menina 48 cm",
              old: "R$ 239",
              new: "R$ 186",
              off: "22% OFF",
              parcela: "12x R$ 18,41",
              cupom: "Cupom R$ 5 OFF",
              frete: "Frete grátis"
            },
            {
              img: "mesa2.webp",
              descricao: "Mesa Infantil de Atividades Didática PlayTime Verde Cotiplás",
              old: "",
              new: "R$ 62",
              off: "39% OFF",
              parcela: "12x R$ 6,15",
              cupom: "Cupom R$ 5 OFF",
              frete: "Frete grátis"
            }
          ]
            .map(prod => `
              <div class="varias-recomendacoes">
                <a href="#">
                  <div class="prod-recomendado-extra">
                    <img src="img/ofertas/OutrasRecomendacoes/fantasias/${prod.img}" alt="">
                    <p id="descricao">${prod.descricao}</p>
                    <p id="oldprice">${prod.old}</p>
                    <div class="desconto">
                      <div class="newprice"><h2>${prod.new}</h2></div>
                      <div class="off"><p>${prod.off}</p></div>
                    </div>
                    <p id="parcela">${prod.parcela}</p>
                    <p id="cupom">${prod.cupom}</p>
                    <p id="frete">${prod.frete}</p>
                  </div>
                </a>
              </div>
            `)
            .join("")}
        </div>
      </div>
    </div>
  `;

  return ofertas;
}