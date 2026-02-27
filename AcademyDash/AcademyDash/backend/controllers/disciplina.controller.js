import { supabase } from "../services/supabase.js";

export const criarDisciplina = async (req, res) => {
  try {
    const { nome, carga_horaria } = req.body;

    if (!nome || !carga_horaria) {
      return res
        .status(400)
        .json({ message: "Nome e carga horária são obrigatórios" });
    }

    const { data, error } = await supabase
      .from("Disciplina")
      .insert([{ nome, carga_horaria, status: "ativa" }])
      .select();

    if (error) {
      console.error("Erro Supabase (criarDisciplina):", error.message);
      return res.status(500).json({ message: "Erro ao criar disciplina" });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (criarDisciplina):", error.message);
    return res.status(500).json({ message: "Erro ao criar disciplina" });
  }
};

export const listarDisciplinas = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Disciplina")
      .select("*")
      .order("nome", { ascending: true });

    if (error) {
      console.error("Erro Supabase (listarDisciplinas):", error.message);
      return res.status(500).json({ message: "Erro ao listar disciplinas" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (listarDisciplinas):", error.message);
    return res.status(500).json({ message: "Erro ao listar disciplinas" });
  }
};

export const buscarDisciplinaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Disciplina")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarDisciplinaPorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar disciplina" });
    }

    if (!data) {
      return res.status(404).json({ message: "Disciplina não encontrada" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (buscarDisciplinaPorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar disciplina" });
  }
};

export const atualizarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, carga_horaria, status } = req.body;

    const { data, error } = await supabase
      .from("Disciplina")
      .update({ nome, carga_horaria, status })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (atualizarDisciplina):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar disciplina" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Disciplina não encontrada" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (atualizarDisciplina):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar disciplina" });
  }
};

export const deletarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("Disciplina").delete().eq("id", id);

    if (error) {
      console.error("Erro Supabase (deletarDisciplina):", error.message);
      return res.status(500).json({ message: "Erro ao deletar disciplina" });
    }

    return res.status(200).json({ message: "Disciplina excluída com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarDisciplina):", error.message);
    return res.status(500).json({ message: "Erro ao deletar disciplina" });
  }
};
