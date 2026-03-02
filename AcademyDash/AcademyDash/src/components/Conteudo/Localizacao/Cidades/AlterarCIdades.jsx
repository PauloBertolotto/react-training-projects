import React, { useState, useEffect } from "react";

import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";

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

import { getEstados } from "@/services/estados";
import { atualizarCidade } from "@/services/cidades";

const AlterarCidades = ({ cidade, onVoltar }) => {
  const [form, setForm] = useState({
    cidade: "",
    ddd: "",
    estado_id: "",
  });

  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cidade) {
      setForm({
        cidade: cidade.cidade || "",
        ddd: cidade.ddd || "",
        estado_id: cidade.estado_id || "",
      });
    }
  }, [cidade]);

  useEffect(() => {
    getEstados()
      .then(setEstados)
      .catch((err) => console.error("Erro ao carregar estados:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cidade || !cidade.id) {
      alert("Nenhuma cidade selecionada para alteração.");
      return;
    }

    if (!form.estado_id) {
      alert("Selecione um estado válido antes de salvar.");
      return;
    }

    setLoading(true);

    try {
      await atualizarCidade(cidade.id, form);
      alert("Cidade alterada com sucesso!");
      if (onVoltar) onVoltar();
    } catch (error) {
      console.error("Erro ao alterar cidade:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Area>
      <AddForm onSubmit={handleSubmit}>
        <Campos>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            type="text"
            id="cidade"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            required
            placeholder="Digite o nome da cidade"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="ddd">DDD</Label>
          <Input
            type="text"
            id="ddd"
            name="ddd"
            value={form.ddd}
            onChange={handleChange}
            required
            placeholder="Digite o DDD (ex: 45)"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="estado_id">Estado</Label>
          <Select
            value={form.estado_id || undefined}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, estado_id: value }))
            }
          >
            <SelectTrigger
              id="estado_id"
              className="w-full text-gray-900 bg-white"
            >
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              {estados.map((estado) => (
                <SelectItem key={estado.id} value={String(estado.id)}>
                  {estado.estado} ({estado.sigla})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Campos>

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? "Salvando..." : "Alterar Cidade"}
        </Button>
      </AddForm>
    </Area>
  );
};

export default AlterarCidades;
