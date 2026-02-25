import { supabase } from "../services/supabase.js";

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

async function findAuthUserByEmail(email) {
  if (!email) return null;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, user_metadata")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar usuário Auth por email:", error.message);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error("Erro inesperado (findAuthUserByEmail):", err.message);
    return null;
  }
}

async function criarUsuarioAuth(email, cpf, nome, acesso) {
  if (!email || !cpf) return null;
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: cpf,
      user_metadata: { nome, acesso },
    });

    if (error) {
      console.error("Erro ao criar usuário no Auth:", error.message);
      return null;
    }

    return data?.user || data || null;
  } catch (err) {
    console.error("Erro inesperado (criarUsuarioAuth):", err.message);
    return null;
  }
}

async function atualizarUsuarioAuthPorEmail(email, cpf, nome, acesso) {
  if (!email) return null;
  try {
    const user = await findAuthUserByEmail(email);
    if (!user) {
      return await criarUsuarioAuth(email, cpf, nome, acesso);
    }

    const updates = {};
    if (cpf) updates.password = cpf;
    updates.user_metadata = { ...(user.user_metadata || {}), nome, acesso };

    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      updates,
    );

    if (error) {
      console.error("Erro ao atualizar usuário no Auth:", error.message);
      return null;
    }

    return data?.user || data || null;
  } catch (err) {
    console.error(
      "Erro inesperado (atualizarUsuarioAuthPorEmail):",
      err.message,
    );
    return null;
  }
}

async function deletarUsuarioAuthPorEmail(email) {
  if (!email) return null;
  try {
    const user = await findAuthUserByEmail(email);
    if (!user) return null;

    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      console.error("Erro ao deletar usuário no Auth:", error.message);
      return null;
    }

    return true;
  } catch (err) {
    console.error("Erro inesperado (deletarUsuarioAuthPorEmail):", err.message);
    return null;
  }
}

export const criarPessoa = async (req, res) => {
  try {
    const { nome, email, cpf, rg, data_nascimento, genero, acesso, telefone } =
      req.body;

    if (!nome || !cpf || !data_nascimento) {
      return res
        .status(400)
        .json({ message: "Nome, CPF e data de nascimento são obrigatórios" });
    }

    const idade = calcularIdade(data_nascimento);
    if (idade < 5) {
      return res.status(400).json({
        message: "Pessoa deve ter pelo menos 5 anos para se cadastrar",
      });
    }

    if (email) {
      const { data: pessoaExistente, error: emailError } = await supabase
        .from("Pessoa")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (emailError) {
        console.error("Erro Supabase (verificar email):", emailError.message);
        return res.status(500).json({ message: "Erro ao verificar email" });
      }

      if (pessoaExistente) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }
    }

    const { data, error } = await supabase
      .from("Pessoa")
      .insert([
        { nome, email, cpf, rg, data_nascimento, genero, acesso, telefone },
      ])
      .select();

    if (error) {
      console.error("Erro Supabase (criarPessoa):", error.message);
      return res.status(500).json({ message: "Erro ao criar pessoa" });
    }

    const pessoaCriada = data[0];

    try {
      if (pessoaCriada?.email && pessoaCriada?.cpf) {
        const authUser = await criarUsuarioAuth(
          pessoaCriada.email,
          pessoaCriada.cpf,
          pessoaCriada.nome,
          pessoaCriada.acesso,
        );

        if (authUser?.id) {
          console.info("Usuário Auth criado (id):", authUser.id);
          pessoaCriada.auth_user_id = authUser.id;
        }
      }
    } catch (authErr) {
      console.error(
        "Erro ao sincronizar com Auth (criarPessoa):",
        authErr?.message || authErr,
      );
    }

    return res.status(201).json(pessoaCriada);
  } catch (error) {
    console.error("Erro inesperado (criarPessoa):", error.message);
    return res.status(500).json({ message: "Erro ao criar pessoa" });
  }
};

export const listarPessoas = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Pessoa")
      .select(
        `
        id, nome, email, cpf, rg, data_nascimento, genero, acesso, telefone,
        Endereco (cep, numero, complemento)
      `,
      )
      .order("nome", { ascending: true });

    if (error) {
      console.error("Erro Supabase (listarPessoas):", error.message);
      return res.status(500).json({ message: "Erro ao listar pessoas" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (listarPessoas):", error.message);
    return res.status(500).json({ message: "Erro ao listar pessoas" });
  }
};

export const buscarPessoaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Pessoa")
      .select(
        `
        id, nome, email, cpf, rg, data_nascimento, genero, acesso, telefone,
        Endereco (cep, numero, complemento)
      `,
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarPessoaPorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar pessoa" });
    }

    if (!data) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }

    try {
      if (data?.email) {
        const authUser = await findAuthUserByEmail(data.email);
        if (authUser?.id) data.auth_user_id = authUser.id;
      }
    } catch (err) {
      console.error(
        "Erro ao buscar auth_user_id (buscarPessoaPorId):",
        err?.message || err,
      );
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (buscarPessoaPorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar pessoa" });
  }
};

export const atualizarPessoa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, cpf, rg, data_nascimento, genero, acesso, telefone } =
      req.body;

    if (data_nascimento) {
      const idade = calcularIdade(data_nascimento);
      if (idade < 5) {
        return res.status(400).json({
          message: "Pessoa deve ter pelo menos 5 anos para se cadastrar",
        });
      }
    }

    if (email) {
      const { data: pessoaExistente, error: emailError } = await supabase
        .from("Pessoa")
        .select("id")
        .eq("email", email)
        .neq("id", id)
        .maybeSingle();

      if (emailError) {
        console.error("Erro Supabase (verificar email):", emailError.message);
        return res.status(500).json({ message: "Erro ao verificar email" });
      }

      if (pessoaExistente) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }
    }

    const { data, error } = await supabase
      .from("Pessoa")
      .update({
        nome,
        email,
        cpf,
        rg,
        data_nascimento,
        genero,
        acesso,
        telefone,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (atualizarPessoa):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar pessoa" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }

    const pessoaAtualizada = data[0];

    try {
      if (pessoaAtualizada?.email) {
        await atualizarUsuarioAuthPorEmail(
          pessoaAtualizada.email,
          pessoaAtualizada.cpf,
          pessoaAtualizada.nome,
          pessoaAtualizada.acesso,
        );
      }
    } catch (authErr) {
      console.error(
        "Erro ao sincronizar com Auth (atualizarPessoa):",
        authErr?.message || authErr,
      );
    }

    try {
      if (pessoaAtualizada?.email) {
        const authUser = await findAuthUserByEmail(pessoaAtualizada.email);
        if (authUser?.id) pessoaAtualizada.auth_user_id = authUser.id;
      }
    } catch (err) {
      console.error(
        "Erro ao buscar auth_user_id (atualizarPessoa):",
        err?.message || err,
      );
    }

    return res.status(200).json(pessoaAtualizada);
  } catch (error) {
    console.error("Erro inesperado (atualizarPessoa):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar pessoa" });
  }
};

export const deletarPessoa = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Pessoa")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (deletarPessoa):", error.message);
      return res.status(500).json({ message: "Erro ao deletar pessoa" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }

    const pessoaDeletada = data[0];

    try {
      if (pessoaDeletada?.email) {
        await deletarUsuarioAuthPorEmail(pessoaDeletada.email);
      }
    } catch (authErr) {
      console.error(
        "Erro ao sincronizar exclusão com Auth (deletarPessoa):",
        authErr?.message || authErr,
      );
    }

    return res.status(200).json({ message: "Pessoa excluída com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarPessoa):", error.message);
    return res.status(500).json({ message: "Erro ao deletar pessoa" });
  }
};
