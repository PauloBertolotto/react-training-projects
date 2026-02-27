import { supabase } from "../services/supabase.js";

export const listarAlunosPorTurma = async (req, res) => {
  try {
    const { turma_id } = req.params;

    if (!turma_id) {
      return res.status(400).json({ message: "ID da turma é obrigatório" });
    }

    const { data, error } = await supabase
      .from("Aluno")
      .select(
        `
    id,
    matricula,
    status,
    turma_id,
    Pessoa (
      nome,
      email,
      cpf,
      genero,
      acesso
    ),
    Turma:turma_id (
      nome,
      turno,
      ano,
      status
    )
  `,
      )
      .eq("turma_id", turma_id)
      .order("matricula", { ascending: true });

    if (error) {
      return res
        .status(500)
        .json({ message: "Erro ao listar alunos da turma" });
    }

    const alunosFiltrados = (data || [])

      .filter((aluno) => aluno.Pessoa?.acesso?.toLowerCase() === "aluno")

      .map((aluno) => {
        const turma = aluno.Turma;

        return {
          id: aluno.id,
          matricula: aluno.matricula,
          status: aluno.status,
          turma_id: aluno.turma_id,

          turma_nome: turma?.nome ?? null,
          turma_turno: turma?.turno ?? null,
          turma_ano: turma?.ano ?? null,

          nome: aluno.Pessoa?.nome ?? null,
          email: aluno.Pessoa?.email ?? null,
        };
      });

    return res.status(200).json(alunosFiltrados);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro inesperado ao listar alunos da turma" });
  }
};
