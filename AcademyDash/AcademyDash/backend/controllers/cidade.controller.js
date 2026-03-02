import { supabase } from "../services/supabase.js";

export const criarCidade = async (req, res) => {
  try {
    const { estado_id, cidade, ddd } = req.body;

    if (!estado_id || !cidade || !ddd) {
      return res.status(400).json({
        message: "Estado, cidade e DDD são obrigatórios",
      });
    }

    const { data: estadoData, error: estadoError } = await supabase
      .from("Estados")
      .select("id")
      .eq("id", estado_id)
      .maybeSingle();

    if (estadoError) {
      console.error("Erro Supabase (validar estado):", estadoError.message);
      return res.status(500).json({ message: "Erro ao validar estado" });
    }

    if (!estadoData) {
      return res
        .status(400)
        .json({ message: "Estado inválido ou não encontrado" });
    }

    const { data, error } = await supabase
      .from("Cidades")
      .insert([{ estado_id, cidade, ddd }])
      .select();

    if (error) {
      console.error("Erro Supabase (criarCidade):", error.message);
      return res.status(500).json({ message: "Erro ao criar cidade" });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (criarCidade):", error.message);
    return res.status(500).json({ message: "Erro ao criar cidade" });
  }
};

export const listarCidades = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Cidades")
      .select(
        `
        id,
        cidade,
        ddd,
        estado_id,
        Estados (estado, sigla)
      `,
      )
      .order("cidade", { ascending: true });

    if (error) {
      console.error("Erro Supabase (listarCidades):", error.message);
      return res.status(500).json({ message: "Erro ao listar cidades" });
    }

    const cidadesComEstado = data.map((item) => ({
      ...item,
      estado: item.Estados ? item.Estados.estado : null,
      sigla: item.Estados ? item.Estados.sigla : null,
    }));

    return res.status(200).json(cidadesComEstado);
  } catch (error) {
    console.error("Erro inesperado (listarCidades):", error.message);
    return res.status(500).json({ message: "Erro ao listar cidades" });
  }
};

export const buscarCidadePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Cidades")
      .select(
        `
        id,
        cidade,
        ddd,
        estado_id,
        Estados (estado, sigla)
      `,
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarCidadePorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar cidade" });
    }

    if (!data) {
      return res.status(404).json({ message: "Cidade não encontrada" });
    }

    const cidadeComEstado = {
      ...data,
      estado: data.Estados ? data.Estados.estado : null,
      sigla: data.Estados ? data.Estados.sigla : null,
    };

    return res.status(200).json(cidadeComEstado);
  } catch (error) {
    console.error("Erro inesperado (buscarCidadePorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar cidade" });
  }
};

export const atualizarCidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado_id, cidade, ddd } = req.body;

    if (!estado_id || !cidade || !ddd) {
      return res.status(400).json({
        message: "Estado, cidade e DDD são obrigatórios",
      });
    }

    const { data: estadoData, error: estadoError } = await supabase
      .from("Estados")
      .select("id")
      .eq("id", estado_id)
      .maybeSingle();

    if (estadoError) {
      console.error("Erro Supabase (validar estado):", estadoError.message);
      return res.status(500).json({ message: "Erro ao validar estado" });
    }

    if (!estadoData) {
      return res
        .status(400)
        .json({ message: "Estado inválido ou não encontrado" });
    }

    const { data, error } = await supabase
      .from("Cidades")
      .update({ estado_id, cidade, ddd })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (atualizarCidade):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar cidade" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Cidade não encontrada" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (atualizarCidade):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar cidade" });
  }
};

export const deletarCidade = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Cidades")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (deletarCidade):", error.message);
      return res.status(500).json({ message: "Erro ao deletar cidade" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Cidade não encontrada" });
    }

    return res.status(200).json({ message: "Cidade excluída com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarCidade):", error.message);
    return res.status(500).json({ message: "Erro ao deletar cidade" });
  }
};
