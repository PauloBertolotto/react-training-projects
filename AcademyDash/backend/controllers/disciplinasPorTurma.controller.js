import { supabase } from "../services/supabase.js";

export const listarTurmas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Turma")
      .select("id, nome, status")
      .ilike("status", "ativo");

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar turmas" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro inesperado" });
  }
};

export const listarDisciplinasPorTurma = async (req, res) => {
  try {
    const { turma_id } = req.params;

    if (!turma_id) {
      return res.status(400).json({ message: "ID da turma é obrigatório" });
    }

    const { data, error } = await supabase
      .from("turma_disciplina")
      .select(
        `
        id,
        turma_id,
        disciplina_id,
        Disciplina:disciplina_id (
          id,
          nome,
          carga_horaria,
          status
        )
      `,
      )
      .eq("turma_id", turma_id);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar disciplinas" });
    }

    const disciplinas = data.map((item) => ({
      id: item.Disciplina?.id,
      nome: item.Disciplina?.nome,
      carga_horaria: item.Disciplina?.carga_horaria,
      status: item.Disciplina?.status,
    }));

    return res.status(200).json(disciplinas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro inesperado" });
  }
};
