import React, { useState, useEffect } from "react";

import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";
import Btn_Alt from "../../BodyCrud/Btn_Alt";
import Label from "../../../Core/Label";
import Input from "../../../Core/Input";

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
        pais: pais.pais,
        sigla: pais.sigla,
        continente: pais.continente,
        ddi: pais.ddi,
        moeda: pais.moeda,
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
        <h3>Alterar País</h3>

        <Campos>
          <Label htmlFor="pais">País:</Label>
          <Input
            type="text"
            id="pais"
            name="pais"
            value={form.pais}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="sigla">Sigla:</Label>
          <Input
            type="text"
            id="sigla"
            name="sigla"
            value={form.sigla}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="ddi">DDI:</Label>
          <Input
            type="text"
            id="ddi"
            name="ddi"
            value={form.ddi}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="moeda">Moeda:</Label>
          <Input
            type="text"
            id="moeda"
            name="moeda"
            value={form.moeda}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="continente">Continente:</Label>
          <select
            id="continente"
            name="continente"
            value={form.continente}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Selecione...</option>
            <option value="Africa">África</option>
            <option value="America do Norte">América do Norte</option>
            <option value="America Central">América Central</option>
            <option value="America do Sul">América do Sul</option>
            <option value="Antartida">Antártida</option>
            <option value="Asia">Ásia</option>
            <option value="Europa">Europa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </Campos>

        <Btn_Alt type="submit" disabled={loading || !pais}>
          {loading ? "Salvando..." : "Alterar País"}
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

export default AlterarPaises;
