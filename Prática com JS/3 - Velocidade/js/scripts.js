const contVelo = document.querySelector('#container');
const velocidade = document.querySelector('#velocidade');

//-------------------------------------------------------------------------

const lblVeloAlcancada = document.createElement('label');
lblVeloAlcancada.innerHTML = 'Velocidade Alcançada: ';
velocidade.appendChild(lblVeloAlcancada);

const inputVelocidadeAlcancada = document.createElement('input');
inputVelocidadeAlcancada.type = 'number';
velocidade.appendChild(inputVelocidadeAlcancada);

const lblVeloLimite = document.createElement('label');
lblVeloLimite.innerHTML = 'Velocidade Limite: ';
velocidade.appendChild(lblVeloLimite);

const inputVelocidadeLimite = document.createElement('input');
inputVelocidadeLimite.type = 'number';
velocidade.appendChild(inputVelocidadeLimite);

//-------------------------------------------------------------------------

const btnCalcular = document.createElement('button');
btnCalcular.type = 'submit';
btnCalcular.innerHTML = 'Verificar';
contVelo.appendChild(btnCalcular);

//-------------------------------------------------------------------------

const divResultado = document.createElement('div');
divResultado.classList.add('Resultado');

//-------------------------------------------------------------------------

btnCalcular.addEventListener("click", function(e) {
    e.preventDefault();

    const VeloAlcancada = parseFloat(inputVelocidadeAlcancada.value);
    const VeloLimite = parseFloat(inputVelocidadeLimite.value);

    if (!VeloAlcancada || !VeloLimite) {
        divResultado.innerHTML = 'Por favor, insira valores válidos.';
        divResultado.style.color = 'white';
        contVelo.appendChild(divResultado);
        return;
    }

    if (VeloAlcancada <= VeloLimite) {
        divResultado.innerHTML = 'Velocidade dentro do limite';
        divResultado.style.color = 'green';
    } else {
        divResultado.innerHTML = 'ULTRAPASSOU O LIMITE! REDUZA IMEDIATAMENTE!';
        divResultado.style.color = 'red';
        divResultado.style.fontWeight = 'bold';
     }

    contVelo.appendChild(divResultado);

})