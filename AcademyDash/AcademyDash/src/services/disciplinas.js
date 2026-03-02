// src/services/disciplinas.js
import { getData } from "./server";

export async function getDisciplinasPorTurma(turmaId) {
  return getData(`disciplinasPorTurma/${turmaId}`);
}

export async function getDisciplinas() {
  return getData("disciplinas");
}
