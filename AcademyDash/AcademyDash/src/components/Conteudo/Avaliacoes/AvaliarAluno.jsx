import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Add from "../BodyCrud/Btn_Add";

import Label from "../../Core/Label";
import Input from "../../Core/Input";

import { getDisciplinas } from "@/services/disciplinas";
import { criarNota } from "@/services/notas";

const todayISO = new Date().toISOString().split("T")[0];

const AvaliarAluno = ({ aluno, onLimparDisciplina }) => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    getDisciplinas()
      .then(setDisciplinas)
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar disciplinas");
      });
  }, []);

  const initialValues = {
    aluno_id: aluno?.id || "",
    aluno_nome: aluno?.nome || "",
    disciplina_id: "",
    nota: "",
    data_avaliacao: "",
    frequencia: "",
  };

  const validationSchema = Yup.object({
    aluno_id: Yup.string().required("Aluno não selecionado"),
    disciplina_id: Yup.string().required("Disciplina não selecionada"),
    nota: Yup.number()
      .typeError("Nota inválida")
      .min(0, "Nota mínima 0")
      .max(10, "Nota máxima 10")
      .required("Informe a nota"),
    data_avaliacao: Yup.date()
      .required("Informe a data da avaliação")
      .max(new Date(), "Data não pode ser no futuro"),
    frequencia: Yup.number()
      .typeError("Frequência inválida")
      .integer("Frequência deve ser um número inteiro")
      .min(0, "Frequência mínima 0")
      .max(100, "Frequência máxima 100")
      .required("Informe a frequência"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      await criarNota(values);
      alert("Nota registrada com sucesso!");
      resetForm();
      if (typeof onLimparDisciplina === "function") {
        onLimparDisciplina();
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao registrar nota");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Area>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <AddForm onSubmit={handleSubmit}>
            <h3>Registrar Nota</h3>

            <Campos>
              <Label htmlFor="aluno_nome">Aluno:</Label>
              <Field name="aluno_id">
                {({ form }) => {
                  const meta = form.getFieldMeta("aluno_id");
                  return (
                    <Input
                      type="text"
                      id="aluno_nome"
                      name="aluno_nome"
                      value={form.values.aluno_nome}
                      readOnly
                      error={meta.touched && meta.error ? meta.error : ""}
                    />
                  );
                }}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="disciplina_id">Disciplina:</Label>
              <Field name="disciplina_id">
                {({ field }) => (
                  <select
                    {...field}
                    id="disciplina_id"
                    className="input"
                    required
                  >
                    <option value="">Selecione uma disciplina...</option>
                    {disciplinas.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nome} — {d.carga_horaria}h
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="nota">Nota:</Label>
              <Field name="nota">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="number"
                    id="nota"
                    min="0"
                    max="10"
                    step="0.1"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="data_avaliacao">Data da Avaliação:</Label>
              <Field name="data_avaliacao">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="date"
                    id="data_avaliacao"
                    max={todayISO}
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="frequencia">Frequência (%):</Label>
              <Field name="frequencia">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="number"
                    id="frequencia"
                    min="0"
                    max="100"
                    step="1"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Btn_Add type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Registrar Nota"}
            </Btn_Add>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AvaliarAluno;
