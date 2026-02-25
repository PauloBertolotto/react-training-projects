import React, { useState, useEffect } from "react";

import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";
import Btn_Alt from "../../BodyCrud/Btn_Alt";

import Label from "../../../Core/Label";
import Input from "../../../Core/Input";

const AlterarTurma = ({ turma, onVoltar }) => {
  const [form, setForm] = useState({
    nome: "",
    ano: "",
    turno: "",
    status: "Ativo",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (turma) {
      setForm({
        nome: turma.nome,
        ano: turma.ano,
        turno: turma.turno,
        status: turma.status,
      });
    }
  }, [turma]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turma) return;

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3333/turmas/${turma.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          ano: Number(form.ano),
          turno: form.turno,
          status: form.status,
        }),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message || "Erro ao atualizar turma");
      }

      alert("Turma alterada com sucesso!");

      if (onVoltar) onVoltar();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Area>
      <AddForm className="form-add-turma" onSubmit={handleSubmit}>
        <h3>Alterar Turma</h3>

        <Campos>
          <Label htmlFor="nome">Nome da Turma:</Label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos className="campo-turma">
          <Label htmlFor="ano">Ano Letivo:</Label>
          <Input
            type="number"
            id="ano"
            name="ano"
            value={form.ano}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos className="campo-turma">
          <Label htmlFor="turno">Turno:</Label>
          <select
            id="turno"
            name="turno"
            value={form.turno}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Selecione...</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </select>
        </Campos>

        <Campos className="campo-turma">
          <Label htmlFor="status">Status:</Label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </Campos>

        <Btn_Alt type="submit" disabled={loading || !turma}>
          {loading ? "Salvando..." : "Alterar Turma"}
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

export default AlterarTurma;
