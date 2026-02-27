import { supabase } from "../services/supabase.js";
import fetch from "node-fetch";

async function buscarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");
  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  if (!response.ok) throw new Error("Erro ao consultar CEP");
  const data = await response.json();
  if (data.erro) throw new Error("CEP não encontrado");
  return {
    logradouro: data.logradouro,
    bairro: data.bairro,
    cidade: data.localidade,
    uf: data.uf,
  };
}

export const criarEndereco = async (req, res) => {
  try {
    const { pessoa_id, cidade_id, numero, complemento, cep } = req.body;

    if (!pessoa_id || !cep || !numero) {
      return res
        .status(400)
        .json({ message: "Pessoa, CEP e número são obrigatórios" });
    }

    const dadosCep = await buscarCep(cep);

    const enderecoCompleto = {
      pessoa_id,
      cidade_id,
      cep,
      numero,
      complemento,
      logradouro: dadosCep.logradouro,
      bairro: dadosCep.bairro,
    };

    const { data, error } = await supabase
      .from("Endereco")
      .insert([enderecoCompleto])
      .select()
      .single();

    if (error) {
      console.error("Erro Supabase (criarEndereco):", error.message);
      return res.status(500).json({ message: "Erro ao criar endereço" });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error("Erro inesperado (criarEndereco):", error.message);
    return res.status(500).json({ message: "Erro ao criar endereço" });
  }
};

export const listarEnderecos = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Endereco")
      .select(
        `
        id,
        pessoa_id,
        cidade_id,
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        Pessoa (id, nome, cpf, email),
        Cidades (cidade, ddd)
      `,
      )
      .order("cep", { ascending: true });

    if (error) {
      console.error("Erro Supabase (listarEnderecos):", error.message);
      return res.status(500).json({ message: "Erro ao listar endereços" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (listarEnderecos):", error.message);
    return res.status(500).json({ message: "Erro ao listar endereços" });
  }
};

export const buscarEnderecoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Endereco")
      .select(
        `
        id,
        pessoa_id,
        cidade_id,
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        Pessoa (id, nome, cpf, email),
        Cidades (cidade, ddd)
      `,
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarEnderecoPorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar endereço" });
    }

    if (!data) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (buscarEnderecoPorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar endereço" });
  }
};

export const atualizarEndereco = async (req, res) => {
  try {
    const { id } = req.params;
    const { pessoa_id, cidade_id, numero, complemento, cep } = req.body;

    if (!cep || !numero) {
      return res.status(400).json({ message: "CEP e número são obrigatórios" });
    }

    const dadosCep = await buscarCep(cep);

    const enderecoAtualizado = {
      pessoa_id,
      cidade_id,
      cep,
      numero,
      complemento,
      logradouro: dadosCep.logradouro,
      bairro: dadosCep.bairro,
    };

    const { data, error } = await supabase
      .from("Endereco")
      .update(enderecoAtualizado)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Erro Supabase (atualizarEndereco):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar endereço" });
    }

    if (!data) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (atualizarEndereco):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar endereço" });
  }
};

export const deletarEndereco = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Endereco")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (deletarEndereco):", error.message);
      return res.status(500).json({ message: "Erro ao deletar endereço" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }

    return res.status(200).json({ message: "Endereço excluído com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarEndereco):", error.message);
    return res.status(500).json({ message: "Erro ao deletar endereço" });
  }
};
