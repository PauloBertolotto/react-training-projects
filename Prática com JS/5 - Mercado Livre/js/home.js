import { iniciarCarrossel } from './homeJS/banner.js';
import { cards, createCard } from './homeJS/bonus.js';
import { criarOfertas } from './homeJS/ofertas.js';
import { createAnuncioMeli } from './homeJS/anuncioMeli.js';
import { createParceriaVideo } from './homeJS/anuncioStreaming.js';
import { criarOutrasOfertas, criarOutrasOfertas2 } from './homeJS/ofertas.js';
import { criarBeneficios } from './homeJS/beneficios.js';


export function carregarHome() {
  const main = document.querySelector("main");
  const app = document.getElementById("app");
  app.innerHTML = "";

  // Remove banner anterior se existir
  const bannerWrapperAntigo = document.querySelector(".banner-wrapper");
  if (bannerWrapperAntigo) bannerWrapperAntigo.remove();

  // Banner
  const imagens = [
    'img/banners/1-banner.png',
    'img/banners/2-banner.png',
    'img/banners/3-banner.png'
  ];

  const bannerWrapper = document.createElement("div");
  bannerWrapper.className = "banner-wrapper";

  const banner = document.createElement("div");
  banner.className = "banner";

  bannerWrapper.appendChild(banner);
  document.body.insertBefore(bannerWrapper, main); // insere ANTES de <main>

  iniciarCarrossel(imagens);

  // Conteúdo principal
  const conteudo = document.createElement("div");
  conteudo.className = "conteudo";
  app.appendChild(conteudo);

  const bonus = document.createElement("div");
  bonus.className = "bonus";
  conteudo.appendChild(bonus);

  cards.forEach(cardData => {
    bonus.appendChild(createCard(cardData));
  });

  app.appendChild(criarOfertas());
  app.appendChild(createAnuncioMeli());
  app.appendChild(createParceriaVideo());
  app.appendChild(criarOutrasOfertas());
  app.appendChild(criarOutrasOfertas2());
  app.appendChild(criarBeneficios());

  document.body.classList.remove('modo-produtos');
}
