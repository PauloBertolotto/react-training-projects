import fetch from "node-fetch";

export async function buscarCep(cep) {
  try {
    // remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, "");

    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (!response.ok) {
      throw new Error("Erro ao consultar CEP");
    }

    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado");
    }

    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
      ddd: data.ddd,
    };
  } catch (error) {
    console.error("Erro buscarCep:", error.message);
    throw error;
  }
}
