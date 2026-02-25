import React, { useState, useEffect } from "react";
import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";
import Btn_Alt from "../../BodyCrud/Btn_Alt";
import Label from "../../../Core/Label";
import Input from "../../../Core/Input";

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
        cidade: cidade.cidade,
        ddd: cidade.ddd,
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
        <h3>Alterar Cidade</h3>

        <Campos>
          <Label htmlFor="cidade">Cidade:</Label>
          <Input
            type="text"
            id="cidade"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="ddd">DDD:</Label>
          <Input
            type="text"
            id="ddd"
            name="ddd"
            value={form.ddd}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="estado_id">Estado:</Label>
          <select
            id="estado_id"
            name="estado_id"
            value={form.estado_id}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Selecione...</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.estado} ({estado.sigla})
              </option>
            ))}
          </select>
        </Campos>

        <Btn_Alt type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Alterar Cidade"}
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

export default AlterarCidades;
