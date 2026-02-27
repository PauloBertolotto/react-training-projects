const result = document.querySelector('#resultado');
const inputData = document.querySelector('#dataNascimento');
const btnCalcular = document.querySelector('#btnCalcular');


btnCalcular.addEventListener("click", function(e){
    e.preventDefault();

    const data = inputData.value;

    if(!data) {
        result.innerHTML = "Data inválida";
        return;
    }

    const idade = calcularIdade(data);
    resultado.innerText = `Sua idade: ${idade} anos`;

});

function calcularIdade(dataNascimento) {

        const dataAtual = new Date();
        const nascimento = new Date(dataNascimento);

        let idade = dataAtual.getFullYear() - nascimento.getFullYear();
        const mesAtual = dataAtual.getMonth();
        const diaAtual = dataAtual.getDate();

        const mesNascimento = nascimento.getMonth();
        const diaNascimento = nascimento.getDate();

        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }

        return idade;
};