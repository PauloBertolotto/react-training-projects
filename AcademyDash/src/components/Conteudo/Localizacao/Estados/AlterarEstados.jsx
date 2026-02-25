import React, { useState, useEffect } from "react";

import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";
import Btn_Alt from "../../BodyCrud/Btn_Alt";
import Label from "../../../Core/Label";
import Input from "../../../Core/Input";

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
        estado: estado.estado,
        sigla: estado.sigla,
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
        <h3>Alterar Estado</h3>

        <Campos>
          <Label htmlFor="estado">Estado:</Label>
          <Input
            type="text"
            id="estado"
            name="estado"
            value={form.estado}
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
          <Label htmlFor="pais_id">País:</Label>
          <select
            id="pais_id"
            name="pais_id"
            value={form.pais_id}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Selecione...</option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id}>
                {pais.pais}
              </option>
            ))}
          </select>
        </Campos>

        <Btn_Alt type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Alterar Estado"}
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

export default AlterarEstados;
