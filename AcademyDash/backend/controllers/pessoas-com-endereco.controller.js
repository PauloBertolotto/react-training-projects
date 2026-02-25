import { supabase } from "../services/supabase.js";
import fetch from "node-fetch";

async function buscarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");
  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  if (!response.ok) throw new Error("Erro ao consultar CEP");
  const data = await response.json();
  if (data.erro) throw new Error("CEP não encontrado");
  return {
    cep: data.cep,
    logradouro: data.logradouro,
    bairro: data.bairro,
    cidade: data.localidade,
    uf: data.uf,
  };
}

export const criarPessoaComEndereco = async (req, res) => {
  try {
    const { pessoa, endereco } = req.body;

    if (!pessoa || !endereco) {
      return res
        .status(400)
        .json({ message: "Dados de pessoa e endereço são obrigatórios" });
    }

    const { data: pessoaData, error: pessoaError } = await supabase
      .from("Pessoa")
      .insert([pessoa])
      .select();

    if (pessoaError) {
      console.error("Erro Supabase (criarPessoa):", pessoaError.message);
      return res.status(500).json({ message: "Erro ao criar pessoa" });
    }

    const pessoaCriada = pessoaData[0];

    const dadosCep = await buscarCep(endereco.cep);

    const enderecoNovo = {
      cep: dadosCep.cep,
      numero: endereco.numero,
      complemento: endereco.complemento,
      logradouro: dadosCep.logradouro,
      bairro: dadosCep.bairro,
      cidade_id: endereco.cidade_id,
      pessoa_id: pessoaCriada.id,
    };

    // Cria endereço vinculado
    const { data: enderecoData, error: enderecoError } = await supabase
      .from("Endereco")
      .insert([enderecoNovo])
      .select();

    if (enderecoError) {
      console.error("Erro Supabase (criarEndereco):", enderecoError.message);
      return res.status(500).json({ message: "Erro ao criar endereço" });
    }

    return res.status(201).json({
      message: "Pessoa e endereço criados com sucesso",
      pessoa: pessoaCriada,
      endereco: enderecoData[0],
    });
  } catch (error) {
    console.error("Erro inesperado (criarPessoaComEndereco):", error.message);
    return res.status(500).json({ message: "Erro ao criar pessoa e endereço" });
  }
};

export const atualizarPessoaComEndereco = async (req, res) => {
  try {
    const { id } = req.params;
    const { pessoa, endereco } = req.body;

    if (!pessoa || !endereco) {
      return res
        .status(400)
        .json({ message: "Dados de pessoa e endereço são obrigatórios" });
    }

    const { data: pessoaData, error: pessoaError } = await supabase
      .from("Pessoa")
      .update(pessoa)
      .eq("id", id)
      .select();

    if (pessoaError) {
      console.error("Erro Supabase (atualizarPessoa):", pessoaError.message);
      return res.status(500).json({ message: "Erro ao atualizar pessoa" });
    }

    const dadosCep = await buscarCep(endereco.cep);

    const enderecoAtualizado = {
      cep: dadosCep.cep,
      numero: endereco.numero,
      complemento: endereco.complemento,
      logradouro: dadosCep.logradouro,
      bairro: dadosCep.bairro,
      cidade_id: endereco.cidade_id,
      pessoa_id: id,
    };

    const { data: enderecoExistente, error: erroBusca } = await supabase
      .from("Endereco")
      .select("id")
      .eq("pessoa_id", id);

    if (erroBusca) {
      console.error("Erro Supabase (buscarEndereco):", erroBusca.message);
      return res.status(500).json({ message: "Erro ao buscar endereço" });
    }

    let enderecoData;

    if (enderecoExistente && enderecoExistente.length > 0) {
      const { data, error } = await supabase
        .from("Endereco")
        .update(enderecoAtualizado)
        .eq("pessoa_id", id)
        .select();

      if (error) {
        console.error("Erro Supabase (atualizarEndereco):", error.message);
        return res.status(500).json({ message: "Erro ao atualizar endereço" });
      }

      enderecoData = data[0];
    } else {
      const { data, error } = await supabase
        .from("Endereco")
        .insert([enderecoAtualizado])
        .select();

      if (error) {
        console.error("Erro Supabase (criarEndereco):", error.message);
        return res.status(500).json({ message: "Erro ao criar endereço" });
      }

      enderecoData = data[0];
    }

    return res.status(200).json({
      message: "Pessoa e endereço atualizados com sucesso",
      pessoa: pessoaData[0],
      endereco: enderecoData,
    });
  } catch (error) {
    console.error(
      "Erro inesperado (atualizarPessoaComEndereco):",
      error.message,
    );
    return res
      .status(500)
      .json({ message: "Erro ao atualizar pessoa e endereço" });
  }
};
