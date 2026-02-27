export const cards = [
  {
    className: "registration",
    img: "img/bonus/registration.jpeg",
    title: "Entre na sua conta",
    text: "Aproveite ofertas para comprar tudo que quiser",
    button: "Entrar na sua conta",
    link: "https://www.mercadolivre.com/jms/mlb/lgz/msl/login?site_id=MLB#da_id=registration&da_position=0&id_origin=/home/dynamic_access&da_sort_algorithm=static"
  },
  {
    className: "localization",
    img: "img/bonus/localization.jpeg",
    title: "Insira sua localização",
    text: "Confira os custos e prazos de entrega",
    button: "Informar localização",
    link: "localizacao.html"
  },
  {
    className: "payment",
    img: "img/bonus/payment.jpeg",
    title: "Meios de pagamento",
    text: "Pague suas compras com rapidez e segurança",
    button: "Mostrar meios",
    link: "pagamento.html"
  },
  {
    className: "lowPrice",
    img: "img/bonus/lowPrice.jpeg",
    title: "Menos de R$100",
    text: "Aproveite ofertas para comprar tudo que quiser",
    button: "Mostrar produtos",
    link: "https://www.mercadolivre.com.br/ofertas?price=0.0-100.0&container_id=MLB779362-1&search_mode=collapsed&cart_mode=default&navigationcp_mode=default&bar_left_button_style=back&back_action=close&authentication_mode=optional&webkit-engine=2#da_id=low_price_products&da_position=3&id_origin=/home/dynamic_access&da_sort_algorithm=static"
  },
  {
    className: "topSale",
    img: "img/bonus/topSale.jpeg",
    title: "Mais vendidos",
    text: "Explore os produtos que são tendência",
    button: "Ir para Mais Vendidos",
    link: "https://www.mercadolivre.com.br/mais-vendidos#da_id=top_sales&da_position=4&id_origin=/home/dynamic_access&da_sort_algorithm=static"
  },
  {
    className: "buyProtected",
    img: "img/bonus/buyProtected.jpeg",
    title: "Compra garantida",
    text: "Você pode devolver sua compra grátis",
    button: "Como funciona",
    link: "https://www.mercadolivre.com.br/compra-garantida/#da_id=protected_buy&da_position=5&id_origin=/home/dynamic_access&da_sort_algorithm=static"
  }
];

export function createCard({ className, img, title, text, button, link }) {
  const card = document.createElement("div");
  card.className = className;

  const heading = document.createElement("h4");
  heading.textContent = title;

  const image = document.createElement("img");
  image.src = img;
  image.alt = "";

  const content = document.createElement("div");

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const btnLink = document.createElement("a");
  btnLink.textContent = button;
  btnLink.href = link;
  btnLink.className = "card-button";

  content.appendChild(paragraph);
  content.appendChild(btnLink);

  card.appendChild(heading);
  card.appendChild(image);
  card.appendChild(content);

  return card;
}