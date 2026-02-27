// src/services/cep.js
import { getData } from "./server";

export async function getLogradouroPorCep(cep) {
  return getData(`cep/${cep}`);
}
