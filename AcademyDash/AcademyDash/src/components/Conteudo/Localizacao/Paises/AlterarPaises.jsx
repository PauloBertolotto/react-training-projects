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

import { atualizarPais } from "@/services/paises";

const AlterarPaises = ({ pais, onVoltar }) => {
  const [form, setForm] = useState({
    pais: "",
    sigla: "",
    continente: "",
    ddi: "",
    moeda: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pais) {
      setForm({
        pais: pais.pais || "",
        sigla: pais.sigla || "",
        continente: pais.continente || "",
        ddi: pais.ddi || "",
        moeda: pais.moeda || "",
      });
    }
  }, [pais]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pais || !pais.id) {
      alert("Nenhum país selecionado para alteração.");
      return;
    }

    setLoading(true);

    try {
      await atualizarPais(pais.id, form);
      alert("País alterado com sucesso!");
      if (onVoltar) onVoltar();
    } catch (error) {
      console.error("Erro ao alterar país:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Area>
      <AddForm onSubmit={handleSubmit}>
        <Campos>
          <Label htmlFor="pais">País</Label>
          <Input
            type="text"
            id="pais"
            name="pais"
            value={form.pais}
            onChange={handleChange}
            required
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
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="ddi">DDI</Label>
          <Input
            type="text"
            id="ddi"
            name="ddi"
            value={form.ddi}
            onChange={handleChange}
            required
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="moeda">Moeda</Label>
          <Input
            type="text"
            id="moeda"
            name="moeda"
            value={form.moeda}
            onChange={handleChange}
            required
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="continente">Continente</Label>
          <Select
            value={form.continente || undefined}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, continente: value }))
            }
          >
            <SelectTrigger
              id="continente"
              className="w-full text-gray-900 bg-white"
            >
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Africa">África</SelectItem>
              <SelectItem value="America do Norte">América do Norte</SelectItem>
              <SelectItem value="America Central">América Central</SelectItem>
              <SelectItem value="America do Sul">América do Sul</SelectItem>
              <SelectItem value="Antartida">Antártida</SelectItem>
              <SelectItem value="Asia">Ásia</SelectItem>
              <SelectItem value="Europa">Europa</SelectItem>
              <SelectItem value="Oceania">Oceania</SelectItem>
            </SelectContent>
          </Select>
        </Campos>

        <Button type="submit" disabled={loading || !pais} className="mt-4">
          {loading ? "Salvando..." : "Alterar País"}
        </Button>
      </AddForm>
    </Area>
  );
};

export default AlterarPaises;
