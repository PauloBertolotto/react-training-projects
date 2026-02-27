import { carregarHome } from './home.js';
import { carregarProdutos } from './produtos.js';

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  // Cria o contêiner onde o conteúdo será trocado
  let app = document.getElementById("app");
  if (!app) {
    app = document.createElement("div");
    app.id = "app";
    main.appendChild(app);
  }

  document.body.className = 'body-home';
  carregarHome();

  const btnCompras = document.getElementById("btn-compras");
  if (btnCompras) {
    btnCompras.addEventListener("click", (e) => {
      e.preventDefault();

      app.innerHTML = "";

      const bannerWrapper = document.querySelector(".banner-wrapper");
      if (bannerWrapper) {
        bannerWrapper.classList.add("oculto");
      }

      // Troca a classe do body
      document.body.className = 'body-produtos';

      // Cria título de compras se ainda não existir
      if (!document.querySelector('.compras-titulo')) {
        const comprasTitulo = document.createElement('div');
        comprasTitulo.classList.add('compras-titulo');

        const titulo = document.createElement('h1');
        titulo.innerText = "Componentes para PC";

        comprasTitulo.appendChild(titulo);

        const header = document.querySelector('header');
        if (header && header.parentNode) {
          header.parentNode.insertBefore(comprasTitulo, header.nextSibling);
        }
      }

      carregarProdutos();
    });
  }

  const btnHome = document.getElementById("btn-home");
  if (btnHome) {
    btnHome.addEventListener("click", (e) => {
      e.preventDefault();

      app.innerHTML = "";

      // Remove título de compras se existir
      const tituloCompras = document.querySelector('.compras-titulo');
      if (tituloCompras) tituloCompras.remove();

      // Troca a classe do body
      document.body.className = 'body-home';

      carregarHome();
    });
  }
});