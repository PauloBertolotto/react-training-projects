import { supabase } from "../services/supabase.js";

export const criarVinculoTurmaDisciplina = async (req, res) => {
  try {
    const { turma_id, disciplina_id } = req.body;

    if (!turma_id || !disciplina_id) {
      return res
        .status(400)
        .json({ message: "Turma e disciplina são obrigatórias" });
    }

    const { data, error } = await supabase
      .from("turma_disciplina")
      .insert([{ turma_id, disciplina_id }])
      .select();

    if (error) {
      console.error("Erro Supabase (criarVinculo):", error.message);
      return res.status(500).json({ message: "Erro ao criar vínculo" });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (criarVinculo):", error.message);
    return res.status(500).json({ message: "Erro ao criar vínculo" });
  }
};

export const listarVinculosTurmaDisciplina = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("turma_disciplina")
      .select("id, Turma(nome), Disciplina(nome)")
      .order("id", { ascending: true });

    if (error) {
      console.error("Erro Supabase (listarVinculos):", error.message);
      return res.status(500).json({ message: "Erro ao listar vínculos" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (listarVinculos):", error.message);
    return res.status(500).json({ message: "Erro ao listar vínculos" });
  }
};

export const buscarVinculoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("turma_disciplina")
      .select("id, turma_id, disciplina_id")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarVinculoPorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar vínculo" });
    }

    if (!data) {
      return res.status(404).json({ message: "Vínculo não encontrado" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (buscarVinculoPorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar vínculo" });
  }
};

export const atualizarVinculoTurmaDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { turma_id, disciplina_id } = req.body;

    const { data, error } = await supabase
      .from("turma_disciplina")
      .update({ turma_id, disciplina_id })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (atualizarVinculo):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar vínculo" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Vínculo não encontrado" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (atualizarVinculo):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar vínculo" });
  }
};

export const deletarVinculoTurmaDisciplina = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("turma_disciplina")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro Supabase (deletarVinculo):", error.message);
      return res.status(500).json({ message: "Erro ao deletar vínculo" });
    }

    return res.status(200).json({ message: "Vínculo excluído com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarVinculo):", error.message);
    return res.status(500).json({ message: "Erro ao deletar vínculo" });
  }
};

export const listarDisciplinasPorTurma = async (req, res) => {
  try {
    const { turmaId } = req.params;

    if (!turmaId) {
      return res.status(400).json({ message: "ID da turma é obrigatório" });
    }

    const { data, error } = await supabase
      .from("turma_disciplina")
      .select(
        `
        id,
        turma_id,
        Disciplina(id, nome, carga_horaria, status)
      `,
      )
      .eq("turma_id", turmaId);

    if (error) {
      console.error(
        "Erro Supabase (listarDisciplinasPorTurma):",
        error.message,
      );
      return res
        .status(500)
        .json({ message: "Erro ao listar disciplinas da turma" });
    }

    // Retorna disciplina + id do vínculo
    return res.status(200).json(
      data.map((v) => ({
        vinculoId: v.id,
        turmaId: v.turma_id,
        ...v.Disciplina,
      })),
    );
  } catch (error) {
    console.error(
      "Erro inesperado (listarDisciplinasPorTurma):",
      error.message,
    );
    return res
      .status(500)
      .json({ message: "Erro ao listar disciplinas da turma" });
  }
};
