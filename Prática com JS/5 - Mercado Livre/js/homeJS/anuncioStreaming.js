export function createParceriaVideo() {
  const parceriaVideo = document.createElement("div");
  parceriaVideo.className = "parceriaVideo";

  const parceriaRow = document.createElement("div");
  parceriaRow.className = "parceria-row";

  const col = document.createElement("div");
  col.className = "col";

  const parceriaLink = document.createElement("div");
  parceriaLink.className = "parceria-link";

  const logoDiv = document.createElement("div");
  logoDiv.className = "logo-MercadoLivre";

  const logoImg = document.createElement("img");
  logoImg.src = "./img/parceriaVideo/logo-mercado-play-v3.png";
  logoImg.alt = "Logo Mercado Livre";
  logoDiv.appendChild(logoImg);

  const textoDiv = document.createElement("div");
  textoDiv.className = "texto";

  const span1 = document.createElement("span");
  span1.className = "primeiro-texto";
  span1.textContent = "Séries e filmes";

  const span2 = document.createElement("span");
  span2.className = "segundo-texto";
  span2.textContent = "também na sua TV!";

  const span3 = document.createElement("span");
  span3.className = "gratis";
  span3.textContent = "Grátis";

  textoDiv.appendChild(span1);
  textoDiv.appendChild(span2);
  textoDiv.appendChild(span3);

  const botaoDiv = document.createElement("div");
  botaoDiv.className = "botao";

  const button = document.createElement("button");
  button.textContent = "Acesse o Mercado Play";
  botaoDiv.appendChild(button);

  parceriaLink.appendChild(logoDiv);
  parceriaLink.appendChild(textoDiv);
  parceriaLink.appendChild(botaoDiv);
  col.appendChild(parceriaLink);

  const videoDiv = document.createElement("div");
  videoDiv.className = "video";

  const videoImg = document.createElement("img");
  videoImg.src = "img/parceriaVideo/StrangerThings.png";
  videoImg.alt = "";
  videoDiv.appendChild(videoImg);

  parceriaRow.appendChild(col);
  parceriaRow.appendChild(videoDiv);
  parceriaVideo.appendChild(parceriaRow);

  return parceriaVideo;
}