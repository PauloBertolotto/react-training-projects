// src/services/notas.js
import { getData, postData, putData } from "./server";

export async function getNotasAluno(alunoId) {
  return getData(`notas/aluno/${alunoId}`);
}

export async function getNotasTurma(turmaId) {
  return getData(`notas/turma/${turmaId}`);
}

export async function criarNota(values) {
  return postData("notas", {
    aluno_id: values.aluno_id,
    disciplina_id: values.disciplina_id,
    nota: values.nota,
    data_avaliacao: values.data_avaliacao,
    frequencia: values.frequencia,
  });
}

export async function atualizarNota(id, values) {
  return putData(`notas/${id}`, {
    nota: values.nota,
    data_avaliacao: values.data_avaliacao,
    frequencia: values.frequencia,
  });
}
