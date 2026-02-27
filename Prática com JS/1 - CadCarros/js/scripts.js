const divAqui = document.querySelector('#cadCarros');
const divCampos = document.querySelector('#campos')
const divBtn = document.querySelector('#botoes');
const divListarCarros = document.querySelector('#listarCarros');

//--------------------------------------------------------------------

const form = document.createElement('form');
divCampos.appendChild(form);


const inputMarca = document.createElement('input');
inputMarca.type = "text";
inputMarca.placeholder = "Marca";
inputMarca.required = true;
form.appendChild(inputMarca);


const inputModelo = document.createElement('input');
inputModelo.type = "text";
inputModelo.placeholder = "Modelo";
inputModelo.required = true;
form.appendChild(inputModelo);


const inputPlaca = document.createElement('input');
inputPlaca.type = "text";
inputPlaca.placeholder = "Placa";
inputPlaca.required = true;
form.appendChild(inputPlaca);

//---------------------------------------------------------------------

const btnEnviar = document.createElement('button');
btnEnviar.type = "submit";
btnEnviar.innerHTML = "Enviar";
divBtn.appendChild(btnEnviar);

const btnMostrar = document.createElement('button');
btnMostrar.type = "submit";
btnMostrar.innerHTML = "Mostrar Dados"
divBtn.appendChild(btnMostrar);

//---------------------------------------------------------------------

btnEnviar.addEventListener("click", function(e) {
    e.preventDefault();

    Incluir();
    
})

//-------------------------------------------------------------------------

btnMostrar.addEventListener("click", function(e) {
    e.preventDefault();

    Mostrar();
})

//-------------------------------------------------------------------------

function Incluir() {
  const novaPlaca = inputPlaca.value.trim().toUpperCase();

  if (placaJaRegistrada(novaPlaca)) {
    alert("Essa placa já está cadastrada!");
    return;
  }

  const carro = {
    id: Date.now().toString(),
    marca: inputMarca.value,
    modelo: inputModelo.value,
    placa: inputPlaca.value,
    ativo: true
  };

  const carrosSalvos = JSON.parse(localStorage.getItem("carros")) || [];
  carrosSalvos.push(carro);
  localStorage.setItem("carros", JSON.stringify(carrosSalvos));

  carrosSalvos.forEach((carro, index) => {
    console.log(`Carro ${index + 1}:`);
    console.log("Marca:", carro.marca);
    console.log("Modelo:", carro.modelo);
    console.log("Placa:", carro.placa);
  });

  Mostrar();
}

function Excluir() {
  const botoesExcluir = document.querySelectorAll('.btnExcluir');

  botoesExcluir.forEach(botao => {
    botao.addEventListener("click", function(e) {
      e.preventDefault();
      const id = botao.getAttribute("data-id");

      const carrosSalvos = JSON.parse(localStorage.getItem("carros")) || [];
      const novaLista = carrosSalvos.filter(carro => carro.id !== id);
      localStorage.setItem("carros", JSON.stringify(novaLista));

      divListarCarros.innerHTML = "";
      btnMostrar.click(); // Atualiza a tela
    });
  });
}

function Mostrar() {
  const carrosSalvos = JSON.parse(localStorage.getItem("carros")) || []; //Trás do localStorage
    divListarCarros.innerHTML = "";


    carrosSalvos.forEach((carro, index) => {
    const dados = document.createElement('div');
    dados.classList.add('listaCarros');
    dados.innerHTML = `
      <h3>Carro ${index + 1}</h3>
      <p><strong>Marca:</strong> ${carro.marca}</p>
      <p><strong>Modelo:</strong> ${carro.modelo}</p>
      <p><strong>Placa:</strong> ${carro.placa}</p>
      <button type="submit" class="btnExcluir" data-id="${carro.id}">Excluir</button>
    `;
    divListarCarros.appendChild(dados);
  });
  form.reset();
  Excluir();
}

function placaJaRegistrada(novaPlaca) {
  const carrosSalvos = JSON.parse(localStorage.getItem("carros")) || [];
  return carrosSalvos.some(carro => carro.placa.toUpperCase() === novaPlaca.toUpperCase());
}
//localStorage.clear();