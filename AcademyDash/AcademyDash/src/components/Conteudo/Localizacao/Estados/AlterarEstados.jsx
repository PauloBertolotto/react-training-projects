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

import { getPaises } from "@/services/paises";
import { atualizarEstado } from "@/services/estados";

const AlterarEstados = ({ estado, onVoltar }) => {
  const [form, setForm] = useState({
    estado: "",
    sigla: "",
    pais_id: "",
  });

  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (estado) {
      setForm({
        estado: estado.estado || "",
        sigla: estado.sigla || "",
        pais_id: estado.pais_id || "",
      });
    }
  }, [estado]);

  useEffect(() => {
    getPaises()
      .then(setPaises)
      .catch((err) => console.error("Erro ao carregar países:", err));
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

    if (!estado || !estado.id) {
      alert("Nenhum estado selecionado para alteração.");
      return;
    }

    if (!form.pais_id) {
      alert("Selecione um país válido antes de salvar.");
      return;
    }

    setLoading(true);

    try {
      await atualizarEstado(estado.id, form);
      alert("Estado alterado com sucesso!");
      if (onVoltar) onVoltar();
    } catch (error) {
      console.error("Erro ao alterar estado:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Area>
      <AddForm onSubmit={handleSubmit}>
        <Campos>
          <Label htmlFor="estado">Estado</Label>
          <Input
            type="text"
            id="estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
            placeholder="Digite o nome do estado"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="sigla">Sigla</Label>
          <Input
            type="text"
            id="sigla"
            name="sigla"
            value={form.sigla}
            onChange={handleChange}
            required
            placeholder="Digite a sigla (ex: PR)"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="pais_id">País</Label>
          <Select
            value={form.pais_id || undefined}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, pais_id: value }))
            }
          >
            <SelectTrigger
              id="pais_id"
              className="w-full text-gray-900 bg-white"
            >
              <SelectValue placeholder="Selecione o país" />
            </SelectTrigger>
            <SelectContent>
              {paises.map((pais) => (
                <SelectItem key={pais.id} value={String(pais.id)}>
                  {pais.pais}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Campos>

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? "Salvando..." : "Alterar Estado"}
        </Button>
      </AddForm>
    </Area>
  );
};

export default AlterarEstados;
