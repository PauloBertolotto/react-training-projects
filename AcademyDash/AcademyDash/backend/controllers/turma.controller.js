import { supabase } from "../services/supabase.js";

export const criarTurma = async (req, res) => {
  try {
    const { nome, ano, turno } = req.body;

    if (!nome || !ano || !turno) {
      return res
        .status(400)
        .json({ message: "Nome, ano e turno são obrigatórios" });
    }

    const { data, error } = await supabase
      .from("Turma")
      .insert([{ nome, ano, turno, status: "Ativo" }])
      .select();

    if (error) {
      console.error("Erro Supabase (criarTurma):", error.message);
      return res.status(500).json({ message: "Erro ao criar turma" });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (criarTurma):", error.message);
    return res.status(500).json({ message: "Erro ao criar turma" });
  }
};

export const listarTurmas = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Turma")
      .select("*")
      .order("ano", { ascending: false });

    if (error) {
      console.error("Erro Supabase (listarTurmas):", error.message);
      return res.status(500).json({ message: "Erro ao listar turmas" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (listarTurmas):", error.message);
    return res.status(500).json({ message: "Erro ao listar turmas" });
  }
};

export const buscarTurmaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Turma")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarTurmaPorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar turma" });
    }

    if (!data) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (buscarTurmaPorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar turma" });
  }
};

export const atualizarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ano, turno, status } = req.body;

    const { data, error } = await supabase
      .from("Turma")
      .update({ nome, ano, turno, status })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (atualizarTurma):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar turma" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (atualizarTurma):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar turma" });
  }
};

export const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("Turma").delete().eq("id", id);

    if (error) {
      console.error("Erro Supabase (deletarTurma):", error.message);
      return res.status(500).json({ message: "Erro ao deletar turma" });
    }

    return res.status(200).json({ message: "Turma excluída com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarTurma):", error.message);
    return res.status(500).json({ message: "Erro ao deletar turma" });
  }
};
