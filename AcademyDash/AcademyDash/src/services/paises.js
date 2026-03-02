// src/services/paises.js
import { getData, postData, putData, deleteData } from "./server";

export async function getPaises() {
  return getData("paises");
}

export async function criarPais(values) {
  return postData("paises", values);
}

export async function atualizarPais(id, values) {
  return putData(`paises/${id}`, values);
}

export async function deletePais(id) {
  return deleteData(`paises/${id}`);
}
