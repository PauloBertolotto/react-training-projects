import { supabase } from "../services/supabase.js";

export const criarNota = async (req, res) => {
  try {
    const { aluno_id, disciplina_id, nota, data_avaliacao, frequencia } =
      req.body;

    if (
      !aluno_id ||
      !disciplina_id ||
      !nota ||
      !data_avaliacao ||
      !frequencia
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const { data, error } = await supabase
      .from("Nota")
      .insert([{ aluno_id, disciplina_id, nota, data_avaliacao, frequencia }])
      .select();

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({ message: "Erro ao registrar nota" });
    }

    return res
      .status(201)
      .json({ message: "Nota registrada com sucesso", data });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).json({ message: "Erro inesperado" });
  }
};

export const listarNotas = async (_req, res) => {
  try {
    const { data, error } = await supabase.from("Nota").select(`
        id,
        nota,
        data_avaliacao,
        frequencia,
        Aluno:aluno_id (
          id,
          matricula,
          status,
          turma_id,
          Pessoa:id (id, nome)
        ),
        Disciplina:disciplina_id (id, nome)
      `);

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({ message: "Erro ao buscar notas" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).json({ message: "Erro inesperado" });
  }
};

export const listarNotasPorTurma = async (req, res) => {
  try {
    const { turmaId } = req.params;

    if (!turmaId) {
      return res.status(400).json({ message: "turmaId é obrigatório" });
    }

    const { data, error } = await supabase
      .from("Nota")
      .select(
        `
        id,
        nota,
        data_avaliacao,
        frequencia,
        Aluno:aluno_id (
          id,
          matricula,
          status,
          turma_id,
          Turma (
            id,
            nome,
            ano,
            turno,
            status
          ),
          Pessoa (
            id,
            nome,
            email
          )
        ),
        Disciplina:disciplina_id (
          id,
          nome,
          carga_horaria
        )
      `,
      )
      .eq("Aluno.turma_id", turmaId);

    if (error) {
      console.error("Erro Supabase (listarNotasPorTurma):", error.message);
      return res.status(500).json({ message: "Erro ao buscar notas da turma" });
    }

    const notasFiltradas = data.filter(
      (nota) =>
        nota.Aluno &&
        nota.Aluno.turma_id &&
        String(nota.Aluno.turma_id) === String(turmaId),
    );

    return res.status(200).json(notasFiltradas);
  } catch (err) {
    console.error("Erro inesperado (listarNotasPorTurma):", err.message);
    return res.status(500).json({ message: "Erro inesperado" });
  }
};

export const alterarNota = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, data_avaliacao, frequencia } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id da nota é obrigatório" });
    }

    const { data, error } = await supabase
      .from("Nota")
      .update({ nota, data_avaliacao, frequencia })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({ message: "Erro ao alterar nota" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Nota não encontrada" });
    }

    return res.status(200).json({ message: "Nota alterada com sucesso", data });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).json({ message: "Erro inesperado" });
  }
};

export const listarNotasPorAluno = async (req, res) => {
  try {
    const { pessoaId } = req.params;

    if (!pessoaId) {
      return res.status(400).json({ message: "pessoaId é obrigatório" });
    }

    const { data, error } = await supabase
      .from("Nota")
      .select(
        `
        id,
        nota,
        data_avaliacao,
        frequencia,
        Aluno:aluno_id (
          id,
          turma_id,
          Pessoa (id, nome, email)
        ),
        Disciplina:disciplina_id (id, nome)
      `,
      )
      .eq("Aluno.Pessoa.id", pessoaId); // filtra só pelo aluno logado

    if (error) {
      console.error("Erro Supabase (listarNotasPorAluno):", error.message);
      return res.status(500).json({ message: "Erro ao buscar notas do aluno" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro inesperado (listarNotasPorAluno):", err.message);
    return res.status(500).json({ message: "Erro inesperado" });
  }
};
