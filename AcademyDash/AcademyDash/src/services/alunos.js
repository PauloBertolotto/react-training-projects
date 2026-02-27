// src/services/alunos.js
import { getData, postData, putData, deleteData } from "./server";

export async function criarAlunoTurma(values) {
  return postData("alunos", {
    id: values.pessoa_id,
    turma_id: values.turma_id,
    status: "ativo",
    matricula: "MAT-" + Math.floor(Math.random() * 1000000),
  });
}

export async function getAlunos() {
  return getData("alunos");
}

export async function getAlunosPorTurma(turmaId) {
  return getData(`alunoPorTurma/${turmaId}`);
}

export async function vincularAlunoTurma(pessoaId, turmaId) {
  return putData(`alunos/pessoa/${pessoaId}`, { turma_id: turmaId });
}

export async function deleteAluno(id) {
  return deleteData(`alunos/${id}`);
}
