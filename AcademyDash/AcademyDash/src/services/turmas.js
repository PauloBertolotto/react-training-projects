// src/services/turmas.js
import { getData } from "./server";

export async function getTurmasAtivas() {
  return getData("turmas?status=Ativo");
}

export async function getTurmas() {
  return getData("turmas");
}

export async function getTurmasDisciplinas() {
  return getData("disciplinasPorTurma/turmas");
}
