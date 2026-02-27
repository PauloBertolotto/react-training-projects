import { supabase } from "../services/supabase.js";

export const resumo = async (_req, res) => {
  try {
    const { data, error } = await supabase.rpc("resumo_relatorios");

    if (error) throw error;

    return res.status(200).json(data?.[0] || {});
  } catch (err) {
    console.error("Erro resumo:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const alunosDetalhes = async (_req, res) => {
  try {
    const { data, error } = await supabase.rpc("relatorio_alunos");

    if (error) throw error;

    return res.status(200).json(data || []);
  } catch (err) {
    console.error("Erro alunosDetalhes:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const disciplinas = async (_req, res) => {
  try {
    const { data, error } = await supabase.rpc("relatorio_disciplinas");

    if (error) throw error;

    return res.status(200).json(data || []);
  } catch (err) {
    console.error("Erro disciplinas:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const frequenciaDisciplinas = async (_req, res) => {
  try {
    const { data, error } = await supabase.rpc("relatorio_frequencia");

    if (error) throw error;

    return res.status(200).json(data || []);
  } catch (err) {
    console.error("Erro frequenciaDisciplinas:", err);
    return res.status(500).json({ error: err.message });
  }
};
