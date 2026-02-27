import { supabase } from "../services/supabase.js";

export const criarPais = async (req, res) => {
  try {
    const { pais, sigla, continente, ddi, moeda } = req.body;

    if (!pais || !sigla || !continente || !ddi || !moeda) {
      return res.status(400).json({
        message: "País, sigla, continente, DDI e moeda são obrigatórios",
      });
    }

    const { data, error } = await supabase
      .from("Paises")
      .insert([{ pais, sigla, continente, ddi, moeda }])
      .select();

    if (error) {
      console.error("Erro Supabase (criarPais):", error.message);
      return res.status(500).json({ message: "Erro ao criar país" });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (criarPais):", error.message);
    return res.status(500).json({ message: "Erro ao criar país" });
  }
};

export const listarPaises = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Paises")
      .select("*")
      .order("pais", { ascending: true });

    if (error) {
      console.error("Erro Supabase (listarPaises):", error.message);
      return res.status(500).json({ message: "Erro ao listar países" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (listarPaises):", error.message);
    return res.status(500).json({ message: "Erro ao listar países" });
  }
};

export const buscarPaisPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Paises")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarPaisPorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar país" });
    }

    if (!data) {
      return res.status(404).json({ message: "País não encontrado" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (buscarPaisPorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar país" });
  }
};

export const atualizarPais = async (req, res) => {
  try {
    const { id } = req.params;
    const { pais, sigla, continente, ddi, moeda } = req.body;

    const { data, error } = await supabase
      .from("Paises")
      .update({ pais, sigla, continente, ddi, moeda })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (atualizarPais):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar país" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "País não encontrado" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (atualizarPais):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar país" });
  }
};

export const deletarPais = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("Paises").delete().eq("id", id);

    if (error) {
      console.error("Erro Supabase (deletarPais):", error.message);
      return res.status(500).json({ message: "Erro ao deletar país" });
    }

    return res.status(200).json({ message: "País excluído com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarPais):", error.message);
    return res.status(500).json({ message: "Erro ao deletar país" });
  }
};
