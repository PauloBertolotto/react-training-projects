import React, { useState, useEffect } from "react";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Alt from "../BodyCrud/Btn_Alt";

import Label from "../../Core/Label";
import Input from "../../Core/Input";

import { atualizarNota } from "@/services/notas";

const AlterarAvaliacao = ({ notaSelecionada, onNotaAlterada }) => {
  const [form, setForm] = useState({
    id: "",
    aluno: { id: "", nome: "" },
    disciplina: { id: "", nome: "" },
    nota: "",
    data_avaliacao: "",
    frequencia: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notaSelecionada) {
      setForm({
        id: notaSelecionada.id || "",
        aluno: {
          id: notaSelecionada.Aluno?.id || "",
          nome: notaSelecionada.Aluno?.Pessoa?.nome || "",
        },
        disciplina: {
          id: notaSelecionada.Disciplina?.id || "",
          nome: notaSelecionada.Disciplina?.nome || "",
        },
        nota: notaSelecionada.nota || "",
        data_avaliacao: notaSelecionada.data_avaliacao || "",
        frequencia: notaSelecionada.frequencia || "",
      });
    }
  }, [notaSelecionada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await atualizarNota(form.id, {
        nota: form.nota,
        data_avaliacao: form.data_avaliacao,
        frequencia: form.frequencia,
      });

      alert("Nota alterada com sucesso!");
      if (typeof onNotaAlterada === "function") {
        onNotaAlterada();
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao alterar nota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Area>
      <AddForm onSubmit={handleSubmit}>
        <h3>Alterar Nota</h3>

        <Campos>
          <Label htmlFor="aluno">Aluno:</Label>
          <Input
            type="text"
            id="aluno"
            name="aluno"
            value={form.aluno.nome}
            readOnly
          />
        </Campos>

        <Campos>
          <Label htmlFor="disciplina">Disciplina:</Label>
          <Input
            type="text"
            id="disciplina"
            name="disciplina"
            value={form.disciplina.nome}
            readOnly
          />
        </Campos>

        <Campos>
          <Label htmlFor="nota">Nota:</Label>
          <Input
            type="number"
            id="nota"
            name="nota"
            min="0"
            max="10"
            step="0.1"
            value={form.nota}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="data_avaliacao">Data da Avaliação:</Label>
          <Input
            type="date"
            id="data_avaliacao"
            name="data_avaliacao"
            value={form.data_avaliacao}
            onChange={handleChange}
            required
            max={new Date().toISOString().split("T")[0]}
          />
        </Campos>

        <Campos>
          <Label htmlFor="frequencia">Frequência (%):</Label>
          <Input
            type="number"
            id="frequencia"
            name="frequencia"
            min="0"
            max="100"
            step="1"
            value={form.frequencia}
            onChange={handleChange}
            required
          />
        </Campos>

        <Btn_Alt type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Alterar Nota"}
        </Btn_Alt>
      </AddForm>
    </Area>
  );
};

export default AlterarAvaliacao;
