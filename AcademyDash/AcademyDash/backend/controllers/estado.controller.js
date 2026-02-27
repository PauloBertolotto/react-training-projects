import { supabase } from "../services/supabase.js";

export const criarEstado = async (req, res) => {
  try {
    const { estado, sigla, pais_id } = req.body;

    if (!estado || !sigla || !pais_id) {
      return res.status(400).json({
        message: "Estado, sigla e país são obrigatórios",
      });
    }

    const { data: paisData, error: paisError } = await supabase
      .from("Paises")
      .select("id")
      .eq("id", pais_id)
      .maybeSingle();

    if (paisError) {
      console.error("Erro Supabase (validar país):", paisError.message);
      return res.status(500).json({ message: "Erro ao validar país" });
    }

    if (!paisData) {
      return res
        .status(400)
        .json({ message: "País inválido ou não encontrado" });
    }

    const { data, error } = await supabase
      .from("Estados")
      .insert([{ estado, sigla, pais_id }])
      .select();

    if (error) {
      console.error("Erro Supabase (criarEstado):", error.message);
      return res.status(500).json({ message: "Erro ao criar estado" });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (criarEstado):", error.message);
    return res.status(500).json({ message: "Erro ao criar estado" });
  }
};

export const listarEstados = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Estados")
      .select(
        `
        id,
        estado,
        sigla,
        pais_id,
        Paises (pais)
      `,
      )
      .order("estado", { ascending: true });

    if (error) {
      console.error("Erro Supabase (listarEstados):", error.message);
      return res.status(500).json({ message: "Erro ao listar estados" });
    }

    const estadosComPais = data.map((item) => ({
      ...item,
      pais: item.Paises ? item.Paises.pais : null,
    }));

    return res.status(200).json(estadosComPais);
  } catch (error) {
    console.error("Erro inesperado (listarEstados):", error.message);
    return res.status(500).json({ message: "Erro ao listar estados" });
  }
};

export const buscarEstadoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Estados")
      .select(
        `
        id,
        estado,
        sigla,
        pais_id,
        Paises (pais)
      `,
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarEstadoPorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar estado" });
    }

    if (!data) {
      return res.status(404).json({ message: "Estado não encontrado" });
    }

    const estadoComPais = {
      ...data,
      pais: data.Paises ? data.Paises.pais : null,
    };

    return res.status(200).json(estadoComPais);
  } catch (error) {
    console.error("Erro inesperado (buscarEstadoPorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar estado" });
  }
};

export const atualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, sigla, pais_id } = req.body;

    if (!estado || !sigla || !pais_id) {
      return res.status(400).json({
        message: "Estado, sigla e país são obrigatórios",
      });
    }

    console.log("Dados recebidos para atualização:", {
      id,
      estado,
      sigla,
      pais_id,
    });

    const { data: paisData, error: paisError } = await supabase
      .from("Paises")
      .select("id")
      .eq("id", pais_id)
      .maybeSingle();

    if (paisError) {
      console.error("Erro Supabase (validar país):", paisError.message);
      return res.status(500).json({ message: "Erro ao validar país" });
    }

    if (!paisData) {
      return res
        .status(400)
        .json({ message: "País inválido ou não encontrado" });
    }

    const { data, error } = await supabase
      .from("Estados")
      .update({ estado, sigla, pais_id })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (atualizarEstado):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar estado" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Estado não encontrado" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (atualizarEstado):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar estado" });
  }
};

export const deletarEstado = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Estados")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (deletarEstado):", error.message);
      return res.status(500).json({ message: "Erro ao deletar estado" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Estado não encontrado" });
    }

    return res.status(200).json({ message: "Estado excluído com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarEstado):", error.message);
    return res.status(500).json({ message: "Erro ao deletar estado" });
  }
};
