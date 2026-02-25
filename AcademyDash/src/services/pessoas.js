// src/services/pessoas.js
import { getData, deleteData, postData, putData } from "./server";

export async function criarPessoaComEndereco(values) {
  return postData("pessoas-com-endereco", {
    pessoa: {
      nome: values.nome,
      email: values.email,
      cpf: values.cpf,
      data_nascimento: values.data_nascimento,
      genero: values.genero,
      acesso: values.acesso,
      rg: values.rg,
      telefone: values.telefone,
    },
    endereco: {
      cep: values.cep,
      numero: values.numero,
      complemento: values.complemento,
      cidade_id: values.cidade_id,
    },
  });
}

export async function atualizarPessoaComEndereco(id, form) {
  return putData(`pessoas-com-endereco/${id}`, form);
}

export async function getPessoas() {
  return getData("pessoas");
}

export async function deletePessoa(id) {
  return deleteData(`pessoas/${id}`);
}
