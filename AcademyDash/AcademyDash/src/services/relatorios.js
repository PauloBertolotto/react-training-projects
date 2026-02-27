// src/services/relatorios.js
import { getData } from "./server";

export async function getResumo() {
  return getData("relatorios/resumo");
}

export async function getRelatorioAlunos() {
  return getData("relatorios/alunos");
}

export async function getRelatorioDisciplinas() {
  return getData("relatorios/disciplinas");
}

export async function getRelatorioFrequenciaDisciplinas() {
  return getData("relatorios/frequencia-disciplinas");
}
