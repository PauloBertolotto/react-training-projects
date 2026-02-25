import React, { useState, useEffect } from "react";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Alt from "../BodyCrud/Btn_Alt";

import Label from "../../Core/Label";
import Input from "../../Core/Input";

const AlterarDisciplina = ({ disciplina, onVoltar }) => {
  const [form, setForm] = useState({
    nome: "",
    carga_horaria: "",
    status: "ativa",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (disciplina) {
      setForm({
        nome: disciplina.nome,
        carga_horaria: disciplina.carga_horaria,
        status: disciplina.status,
      });
    }
  }, [disciplina]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!disciplina || !disciplina.id) {
      alert("Nenhuma disciplina selecionada para alteração.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3333/disciplinas/${disciplina.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: form.nome,
            carga_horaria: Number(form.carga_horaria),
            status: form.status,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro ao atualizar disciplina");
      }

      alert("Disciplina alterada com sucesso!");

      // 🔥 volta automaticamente para lista
      if (onVoltar) onVoltar();
    } catch (error) {
      console.error("Erro ao alterar disciplina:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Area>
      <AddForm onSubmit={handleSubmit}>
        <h3>Alterar Disciplina</h3>

        <Campos>
          <Label htmlFor="nome">Disciplina:</Label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="carga_horaria">Carga Horária:</Label>
          <Input
            type="number"
            id="carga_horaria"
            name="carga_horaria"
            value={form.carga_horaria}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="status">Status:</Label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="ativa">Ativa</option>
            <option value="inativa">Inativa</option>
          </select>
        </Campos>

        <Btn_Alt type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Alterar Disciplina"}
        </Btn_Alt>

        {onVoltar && (
          <button
            type="button"
            onClick={onVoltar}
            className="bg-gray-500 text-white px-3 py-1 rounded mt-3"
          >
            Voltar
          </button>
        )}
      </AddForm>
    </Area>
  );
};

export default AlterarDisciplina;
