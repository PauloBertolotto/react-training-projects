import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";
import Btn_Add from "../../BodyCrud/Btn_Add";

import Label from "../../../Core/Label";
import Input from "../../../Core/Input";

const VinculandoDisc = ({ turma, onVoltar }) => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const carregarDisciplinas = async () => {
      try {
        const res = await fetch(
          "http://localhost:3333/disciplinas?status=ativa",
        );
        if (!res.ok) throw new Error("Erro ao carregar disciplinas");
        const data = await res.json();
        setDisciplinas(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar disciplinas");
      }
    };
    carregarDisciplinas();
  }, []);

  const initialValues = {
    turma_id: turma?.id || "",
    disciplina_id: "",
  };

  const validationSchema = Yup.object({
    turma_id: Yup.string().required("Selecione uma turma"),
    disciplina_id: Yup.string().required("Selecione uma disciplina"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:3333/turma-disciplina", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(
          err?.message || "Erro ao salvar vínculo turma-disciplina",
        );
      }

      await response.json();
      alert("Disciplina vinculada à turma com sucesso!");

      // 🔥 volta automaticamente para lista
      if (onVoltar) onVoltar();
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao salvar vínculo turma-disciplina");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Area>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <AddForm onSubmit={handleSubmit}>
            <h3>Vincular Disciplina à Turma</h3>

            <Campos>
              <Label>Turma:</Label>
              <Input type="text" value={turma?.nome || ""} readOnly />
            </Campos>

            <Campos>
              <Label htmlFor="disciplina_id">Disciplina:</Label>
              <Field
                as="select"
                name="disciplina_id"
                id="disciplina_id"
                className="input"
              >
                <option value="">Selecione...</option>
                {disciplinas.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome} — {d.carga_horaria}h
                  </option>
                ))}
              </Field>
            </Campos>

            <Btn_Add type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Vincular"}
            </Btn_Add>

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
        )}
      </Formik>
    </Area>
  );
};

export default VinculandoDisc;
