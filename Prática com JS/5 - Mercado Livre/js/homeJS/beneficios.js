export function criarBeneficios() {
  const beneficios = document.createElement("div");
  beneficios.className = "beneficios";

  const row = document.createElement("div");
  row.className = "row-beneficios";

  // Seção superior
  const superior = document.createElement("section");
  superior.id = "superior";

  const texto = document.createElement("div");
  texto.className = "beneficios-text";
  texto.textContent = "Benefícios em entretenimento";

  const botao = document.createElement("div");
  botao.className = "beneficios-button";

  const button = document.createElement("button");
  botao.appendChild(button);

  superior.appendChild(texto);
  superior.appendChild(botao);

  // Seção inferior
  const inferior = document.createElement("section");
  inferior.id = "inferior";

  // Disney
  const disneyLink = document.createElement("a");
  disneyLink.href = "#";
  disneyLink.className = "disney";

  const disneyConteudo = document.createElement("div");
  disneyConteudo.className = "disney-conteudo";

  const disneyImg = document.createElement("img");
  disneyImg.src = "img/anuncios/beneficios/logo-disney.png";
  disneyImg.alt = "Logo Disney Plus";

  const disneyText = document.createElement("div");
  disneyText.className = "disney-text";

  const disneyTop = document.createElement("p");
  disneyTop.id = "top";
  disneyTop.textContent = "Incluído com o";

  const disneyMid = document.createElement("p");
  disneyMid.id = "mid";
  disneyMid.textContent = "Meli+ Total";

  const disneyBot = document.createElement("p");
  disneyBot.id = "bot";
  disneyBot.textContent = "Plano Padrão com anúncios";

  disneyText.appendChild(disneyTop);
  disneyText.appendChild(disneyMid);
  disneyText.appendChild(disneyBot);

  disneyConteudo.appendChild(disneyImg);
  disneyConteudo.appendChild(disneyText);
  disneyLink.appendChild(disneyConteudo);

  // Max
  const maxLink = document.createElement("a");
  maxLink.href = "#";
  maxLink.className = "max";

  const maxConteudo = document.createElement("div");
  maxConteudo.className = "max-conteudo";

  const maxImg = document.createElement("img");
  maxImg.src = "img/anuncios/beneficios/logo-max.png";
  maxImg.alt = "Logo HBO Max";

  const maxText = document.createElement("div");
  maxText.className = "max-text";

  const maxTop = document.createElement("p");
  maxTop.id = "top";
  maxTop.textContent = "15% OFF";

  const maxBot = document.createElement("p");
  maxBot.id = "bot";
  maxBot.textContent = "HBO Max";

  maxText.appendChild(maxTop);
  maxText.appendChild(maxBot);

  maxConteudo.appendChild(maxImg);
  maxConteudo.appendChild(maxText);
  maxLink.appendChild(maxConteudo);

  // Globoplay
  const gplayLink = document.createElement("a");
  gplayLink.href = "#";
  gplayLink.className = "gplay";

  const gplayConteudo = document.createElement("div");
  gplayConteudo.className = "gplay-conteudo";

  const gplayImg = document.createElement("img");
  gplayImg.src = "img/anuncios/beneficios/logo-gplay.png";
  gplayImg.alt = "Logo Globo Play";

  const gplayText = document.createElement("div");
  gplayText.className = "gplay-text";

  const gplayTop = document.createElement("p");
  gplayTop.id = "top";
  gplayTop.textContent = "15% OFF";

  const gplayBot = document.createElement("p");
  gplayBot.id = "bot";
  gplayBot.textContent = "Globoplay Premium";

  gplayText.appendChild(gplayTop);
  gplayText.appendChild(gplayBot);

  gplayConteudo.appendChild(gplayImg);
  gplayConteudo.appendChild(gplayText);
  gplayLink.appendChild(gplayConteudo);

  // Monta tudo
  inferior.appendChild(disneyLink);
  inferior.appendChild(maxLink);
  inferior.appendChild(gplayLink);

  row.appendChild(superior);
  row.appendChild(inferior);
  beneficios.appendChild(row);

  return beneficios;
}