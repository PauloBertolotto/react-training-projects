// src/services/cidades.js
import { getData, postData, putData, deleteData } from "./server";

export async function getCidades() {
  return getData("cidades");
}

export async function criarCidade(values) {
  return postData("cidades", values);
}

export async function atualizarCidade(id, values) {
  return putData(`cidades/${id}`, values);
}

export async function deleteCidade(id) {
  return deleteData(`cidades/${id}`);
}
