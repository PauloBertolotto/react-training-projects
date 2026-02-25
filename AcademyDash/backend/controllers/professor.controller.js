import { supabase } from "../services/supabase.js";

export const criarProfessor = async (req, res) => {
  try {
    const { pessoa_id, especialidade, titulo, status, disciplina_id } =
      req.body;

    if (!pessoa_id || !especialidade || !titulo || !disciplina_id) {
      return res.status(400).json({
        message: "Pessoa, especialidade, título e disciplina são obrigatórios",
      });
    }

    const { data: professorExistente } = await supabase
      .from("Professor")
      .select("id")
      .eq("id", pessoa_id)
      .maybeSingle();

    let professor;
    if (!professorExistente) {
      const { data, error } = await supabase
        .from("Professor")
        .insert([
          {
            id: pessoa_id,
            especialidade,
            titulo,
            status: status || "ativa",
          },
        ])
        .select();

      if (error) {
        console.error("Erro Supabase (criarProfessor):", error.message);
        return res.status(500).json({ message: "Erro ao criar professor" });
      }
      professor = data[0];
    } else {
      professor = professorExistente;
    }

    const { data: vinculoExistente } = await supabase
      .from("professor_disciplina")
      .select("id")
      .eq("professor_id", pessoa_id)
      .eq("disciplina_id", disciplina_id)
      .maybeSingle();

    let vinculo = vinculoExistente;
    if (!vinculo) {
      const { data, error } = await supabase
        .from("professor_disciplina")
        .insert([{ professor_id: pessoa_id, disciplina_id }])
        .select();

      if (error) {
        console.error("Erro Supabase (criarVinculo):", error.message);
        return res.status(500).json({ message: "Erro ao vincular disciplina" });
      }
      vinculo = data[0];
    }

    return res.status(201).json({ professor, vinculo });
  } catch (error) {
    console.error("Erro inesperado (criarProfessor):", error.message);
    return res
      .status(500)
      .json({ message: "Erro ao criar professor e vínculo" });
  }
};

export const listarProfessores = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Professor")
      .select(
        `
        id,
        especialidade,
        titulo,
        status,
        Pessoa (
          nome,
          email,
          cpf,
          genero,
          telefone,
          data_nascimento
        )
      `,
      )
      .order("nome", { ascending: true });

    if (error) {
      console.error("Erro Supabase (listarProfessores):", error.message);
      return res.status(500).json({ message: "Erro ao listar professores" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (listarProfessores):", error.message);
    return res.status(500).json({ message: "Erro ao listar professores" });
  }
};

export const buscarProfessorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Professor")
      .select(
        `
        id,
        especialidade,
        titulo,
        status,
        Pessoa (
          nome,
          email,
          cpf,
          genero,
          telefone,
          data_nascimento
        )
      `,
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (buscarProfessorPorId):", error.message);
      return res.status(500).json({ message: "Erro ao buscar professor" });
    }

    if (!data) {
      return res.status(404).json({ message: "Professor não encontrado" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro inesperado (buscarProfessorPorId):", error.message);
    return res.status(500).json({ message: "Erro ao buscar professor" });
  }
};

export const atualizarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { especialidade, titulo, status } = req.body;

    const { data, error } = await supabase
      .from("Professor")
      .update({ especialidade, titulo, status })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro Supabase (atualizarProfessor):", error.message);
      return res.status(500).json({ message: "Erro ao atualizar professor" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Professor não encontrado" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Erro inesperado (atualizarProfessor):", error.message);
    return res.status(500).json({ message: "Erro ao atualizar professor" });
  }
};

export const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("Professor").delete().eq("id", id);

    if (error) {
      console.error("Erro Supabase (deletarProfessor):", error.message);
      return res.status(500).json({ message: "Erro ao deletar professor" });
    }

    return res.status(200).json({ message: "Professor excluído com sucesso" });
  } catch (error) {
    console.error("Erro inesperado (deletarProfessor):", error.message);
    return res.status(500).json({ message: "Erro ao deletar professor" });
  }
};

export const listarProfessoresComDisciplina = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("Professor")
      .select(
        `
        id,
        especialidade,
        titulo,
        status,
        Pessoa (
          id,
          nome,
          email,
          cpf,
          genero,
          telefone,
          data_nascimento
        ),
        professor_disciplina (
          id,
          disciplina_id,
          Disciplina (
            id,
            nome,
            carga_horaria,
            status
          )
        )
      `,
      )
      .order("id", { ascending: true });

    if (error) {
      console.error(
        "Erro Supabase (listarProfessoresComDisciplina):",
        error.message,
      );
      return res
        .status(500)
        .json({ message: "Erro ao listar professores com disciplina" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "Erro inesperado (listarProfessoresComDisciplina):",
      error.message,
    );
    return res
      .status(500)
      .json({ message: "Erro ao listar professores com disciplina" });
  }
};

export const buscarProfessorComDisciplinaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Professor")
      .select(
        `
        id,
        especialidade,
        titulo,
        status,
        Pessoa (
          id,
          nome,
          email,
          cpf,
          genero,
          telefone,
          data_nascimento
        ),
        professor_disciplina (
          id,
          disciplina_id,
          Disciplina (
            id,
            nome,
            carga_horaria,
            status
          )
        )
      `,
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(
        "Erro Supabase (buscarProfessorComDisciplinaPorId):",
        error.message,
      );
      return res
        .status(500)
        .json({ message: "Erro ao buscar professor com disciplina" });
    }

    if (!data) {
      return res.status(404).json({ message: "Professor não encontrado" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "Erro inesperado (buscarProfessorComDisciplinaPorId):",
      error.message,
    );
    return res
      .status(500)
      .json({ message: "Erro ao buscar professor com disciplina" });
  }
};

export const atualizarDisciplinaProfessor = async (req, res) => {
  try {
    const { id } = req.params; // id do professor
    const { disciplina_id } = req.body;

    if (!disciplina_id) {
      return res.status(400).json({ message: "Disciplina é obrigatória" });
    }

    // Verifica se já existe vínculo
    const { data: vinculoExistente, error: vinculoError } = await supabase
      .from("professor_disciplina")
      .select("id")
      .eq("professor_id", id)
      .maybeSingle();

    if (vinculoError) {
      console.error("Erro Supabase (buscarVinculo):", vinculoError.message);
      return res.status(500).json({ message: "Erro ao buscar vínculo" });
    }

    let vinculo;

    if (vinculoExistente) {
      // Atualiza vínculo existente
      const { data, error } = await supabase
        .from("professor_disciplina")
        .update({ disciplina_id })
        .eq("id", vinculoExistente.id)
        .select();

      if (error) {
        console.error(
          "Erro Supabase (atualizarDisciplinaProfessor):",
          error.message,
        );
        return res
          .status(500)
          .json({ message: "Erro ao atualizar disciplina do professor" });
      }

      vinculo = data[0];
    } else {
      // Cria novo vínculo
      const { data, error } = await supabase
        .from("professor_disciplina")
        .insert([{ professor_id: id, disciplina_id }])
        .select();

      if (error) {
        console.error(
          "Erro Supabase (criarVinculoDisciplinaProfessor):",
          error.message,
        );
        return res
          .status(500)
          .json({ message: "Erro ao vincular disciplina ao professor" });
      }

      vinculo = data[0];
    }

    return res
      .status(200)
      .json({ message: "Disciplina vinculada com sucesso", vinculo });
  } catch (error) {
    console.error(
      "Erro inesperado (atualizarDisciplinaProfessor):",
      error.message,
    );
    return res
      .status(500)
      .json({ message: "Erro ao atualizar disciplina do professor" });
  }
};
