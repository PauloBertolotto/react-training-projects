const pessoas = [];

// adiciona as informações digitadas no array pessoas
document.getElementById('btnAdicionar').addEventListener('click', () => {

  const nome = document.getElementById('inputNome').value;
  const idade = parseInt(document.getElementById('inputIdade').value);
  const peso = parseFloat(document.getElementById('inputPeso').value);

  if (!nome || isNaN(idade) || isNaN(peso)) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  pessoas.push({ nome, idade, peso });

  document.getElementById('inputNome').value = '';
  document.getElementById('inputIdade').value = '';
  document.getElementById('inputPeso').value = '';
});


// Calcula o peso total
document.querySelector('button[type="submit"]').addEventListener('click', () => {
  const limite = parseFloat(document.getElementById('inputLimite').value);

  if (isNaN(limite)) {
    alert('Digite um limite de peso válido!');
    return;
  }

  // Listar dados das pessoas
  const divLista = document.querySelector('.listaPessoas');
  divLista.innerHTML = '<h3>Pessoas no elevador:</h3>';

  pessoas.forEach((pessoa, index) => {
    const item = document.createElement('p');
    item.textContent = `${index + 1}. Nome: ${pessoa.nome}, Idade: ${pessoa.idade}, Peso: ${pessoa.peso} kg`;
    divLista.appendChild(item);
  });

  // Calcular peso total
  const pesoTotal = pessoas.reduce((total, pessoa) => total + pessoa.peso, 0);

  let resultado = '';
  if (pesoTotal < limite) {
    resultado = 'Ok';
  } else if (pesoTotal === limite) {
    resultado = 'Cuidado!';
  } else {
    resultado = 'fuuuu, vai cair!';
  }

  document.querySelector('.resultado').textContent = `Peso total: ${pesoTotal} kg — Resultado: ${resultado}`;

  pessoas.length = 0;
});