import { supabase } from "../services/supabase.js";

export const criarAluno = async (req, res) => {
  try {
    const { id, turma_id, status, matricula } = req.body;
    if (!id || !turma_id) {
      return res
        .status(400)
        .json({ message: "ID da pessoa e ID da turma são obrigatórios" });
    }
    const { data: existente, error: erroBusca } = await supabase
      .from("Aluno")
      .select("id")
      .eq("id", id)
      .maybeSingle();
    if (erroBusca) {
      console.error("SUPABASE VERIFICAR:", erroBusca);
      return res
        .status(500)
        .json({ message: "Erro ao verificar vínculo", supabase: erroBusca });
    }
    if (existente) {
      return res.status(400).json({ message: "Aluno já vinculado" });
    }
    const payload = {
      id,
      turma_id,
      status: status || "ativo",
      matricula: matricula || "MAT-" + Math.floor(Math.random() * 1000000),
    };
    const { data, error } = await supabase
      .from("Aluno")
      .insert([payload])
      .select();
    if (error) {
      console.error("SUPABASE INSERT:", error);
      return res
        .status(500)
        .json({ message: "Erro ao criar aluno", supabase: error });
    }
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error("UNEXPECTED:", error);
    return res
      .status(500)
      .json({ message: "Erro ao criar aluno", error: String(error) });
  }
};

export const listarAlunos = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Aluno")
      .select(
        `
        id,
        matricula,
        status,
        turma_id,
        Pessoa (
          nome,
          email,
          cpf,
          genero
        ),
        Turma (
          nome,
          turno
        )
      `,
      )
      .order("matricula", { ascending: true });

    if (error) {
      return res.status(500).json({ message: "Erro ao listar alunos" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar alunos" });
  }
};

export const buscarAlunoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Aluno")
      .select(
        `
        id,
        matricula,
        status,
        turma_id,
        Pessoa (
          nome,
          email,
          cpf,
          genero
        ),
        Turma (
          nome,
          turno
        )
      `,
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ message: "Erro ao buscar aluno" });
    }

    if (!data) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar aluno" });
  }
};

export const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { turma_id, status } = req.body;

    const { data, error } = await supabase
      .from("Aluno")
      .update({ turma_id, status })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({ message: "Erro ao atualizar aluno" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar aluno" });
  }
};

export const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Aluno")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({ message: "Erro ao deletar aluno" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.status(200).json({ message: "Aluno desvinculado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar aluno" });
  }
};

export const atualizarTurmaDeAluno = async (req, res) => {
  try {
    const { pessoaId } = req.params;
    const { turma_id } = req.body;

    console.log("➡️ pessoaId:", pessoaId);
    console.log("➡️ nova turma_id:", turma_id);

    if (!pessoaId) {
      return res.status(400).json({ message: "pessoaId obrigatório" });
    }

    const { data: updated, error: updateError } = await supabase
      .from("Aluno")
      .update({ turma_id: turma_id ?? null })
      .eq("id", pessoaId)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error("❌ Erro UPDATE:", updateError);
      return res.status(500).json({ message: "Erro ao atualizar vínculo" });
    }

    if (!updated) {
      const payload = {
        id: pessoaId,
        turma_id: turma_id ?? null,
        status: "ativo",
        matricula: `MAT-${Math.floor(Math.random() * 1000000)}`,
      };

      const { data: inserted, error: insertError } = await supabase
        .from("Aluno")
        .insert([payload])
        .select()
        .maybeSingle();

      if (insertError) {
        console.error("❌ Erro INSERT:", insertError);
        return res.status(500).json({ message: "Erro ao criar vínculo" });
      }

      return res.status(201).json({ aluno: inserted });
    }

    return res.status(200).json({ aluno: updated });
  } catch (err) {
    console.error("❌ Erro inesperado:", err);
    return res
      .status(500)
      .json({ message: "Erro inesperado ao atualizar vínculo" });
  }
};
