// src/services/professores.js
import { getData, postData, putData, deleteData } from "./server";

export async function getProfessoresComDisciplina() {
  return getData("professores/com-disciplina");
}

export async function buscarProfessorComDisciplinaPorId(id) {
  return getData(`professores/${id}/com-disciplina`);
}

export async function criarProfessor(values) {
  return postData("professores", values);
}

export async function atualizarProfessor(id, updates) {
  return putData(`professores/${id}`, updates);
}

export async function atualizarProfessorDisciplina(id, updates) {
  return putData(`professores/${id}/disciplina`, updates);
}

export async function deleteProfessor(id) {
  return deleteData(`professores/${id}`);
}
