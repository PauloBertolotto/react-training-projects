import React, { useState, useEffect } from "react";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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
        <Campos>
          <Label htmlFor="nome">Disciplina</Label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full text-gray-900 bg-white placeholder:text-gray-400"
          />
        </Campos>

        <Campos>
          <Label htmlFor="carga_horaria">Carga Horária</Label>
          <Input
            type="number"
            id="carga_horaria"
            name="carga_horaria"
            value={form.carga_horaria}
            onChange={handleChange}
            required
            className="w-full text-gray-900 bg-white placeholder:text-gray-400"
          />
        </Campos>

        <Campos>
          <Label htmlFor="status">Status</Label>
          <Select
            value={form.status}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger
              id="status"
              className="w-full text-gray-900 bg-white"
            >
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativa">Ativa</SelectItem>
              <SelectItem value="inativa">Inativa</SelectItem>
            </SelectContent>
          </Select>
        </Campos>

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? "Salvando..." : "Alterar Disciplina"}
        </Button>
      </AddForm>
    </Area>
  );
};

export default AlterarDisciplina;
