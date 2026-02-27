export function createAnuncioMeli() {
  const anuncioMeli = document.createElement("div");
  anuncioMeli.className = "anuncioMeli";

  const link = document.createElement("a");
  link.href =
    "https://www.mercadolivre.com.br/assinaturas/melimais?product=meli_total&showModal=true#origin=widget_l6_home#c_id=/home/user-loyalty-benefits&c_uid=7f9a082b-a81e-4e1b-89e7-bf195ddef211";

  const elementosAnuncio = document.createElement("div");
  elementosAnuncio.className = "elementosAnuncio";

  const topoAnuncio = document.createElement("section");
  topoAnuncio.id = "TopoAnuncio";

  const meliTitle = document.createElement("div");
  meliTitle.className = "meli-title";

  const logo = document.createElement("img");
  logo.src = "img/anuncios/meli/pill-meliplus.png";
  logo.alt = "Meli+ Logo";

  const title = document.createElement("div");
  title.className = "title";
  title.innerHTML = 'BENEFÍCIOS EXCLUSIVOS A PARTIR DE <span>R$ 9,90/MÊS</span>';

  meliTitle.appendChild(logo);
  meliTitle.appendChild(title);

  const btnAssinatura = document.createElement("div");
  btnAssinatura.className = "btnAssinatura";
  btnAssinatura.textContent = "Assinar o Meli+";

  topoAnuncio.appendChild(meliTitle);
  topoAnuncio.appendChild(btnAssinatura);

  const corpoAnuncio = document.createElement("section");
  corpoAnuncio.id = "corpoAnuncio";

  const beneficios = [
    {
      img: "img/anuncios/meli/streamings.png",
      alt: "Streamings parceiros",
      text: "As melhores plataformas de entretenimento"
    },
    {
      img: "img/anuncios/meli/cashback.png",
      alt: "cashback",
      text: "Até 5% de cashback no Mercado Livre"
    },
    {
      img: "img/anuncios/meli/parcelamento.png",
      alt: "Número de parcelas",
      text: "Até 3 parcelas extras sem juros nas compras"
    },
    {
      img: "img/anuncios/meli/rendimento.png",
      alt: "Rendimento no CDI",
      text: "Rendimento de 120% do CDI no Mercado Pago"
    }
  ];

  beneficios.forEach(({ img, alt, text }) => {
    const beneficio = document.createElement("div");
    beneficio.className = "beneficioAnuncio";

    const imagem = document.createElement("img");
    imagem.src = img;
    imagem.alt = alt;
    imagem.className = "imgBeneficioAnuncio";

    const paragrafo = document.createElement("p");
    paragrafo.className = "textBeneficioAnuncio";
    paragrafo.textContent = text;

    beneficio.appendChild(imagem);
    beneficio.appendChild(paragrafo);
    corpoAnuncio.appendChild(beneficio);
  });

  elementosAnuncio.appendChild(topoAnuncio);
  elementosAnuncio.appendChild(corpoAnuncio);
  link.appendChild(elementosAnuncio);
  anuncioMeli.appendChild(link);

  return anuncioMeli;
}