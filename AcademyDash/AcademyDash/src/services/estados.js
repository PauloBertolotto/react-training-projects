// src/services/estados.js
import { getData, postData, putData, deleteData } from "./server";

export async function getEstados() {
  return getData("estados");
}

export async function criarEstado(values) {
  return postData("estados", values);
}

export async function atualizarEstado(id, values) {
  return putData(`estados/${id}`, values);
}

export async function deleteEstado(id) {
  return deleteData(`estados/${id}`);
}
