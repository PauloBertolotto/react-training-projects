import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Add from "../BodyCrud/Btn_Add";
import Label from "../../Core/Label";
import Input from "../../Core/Input";

import { criarAlunoTurma } from "@/services/alunos";

const AlunoTurma = ({ aluno, turma }) => {
  const initialValues = {
    pessoa_id: aluno?.id || "",
    pessoa_nome: aluno?.nome || "",
    pessoa_email: aluno?.email || "",
    pessoa_cpf: aluno?.cpf || "",
    turma_id: turma?.id || "",
    turma_nome: turma?.nome || "",
    turma_turno: turma?.turno || "",
  };

  const validationSchema = Yup.object({
    pessoa_id: Yup.string().required("Aluno não selecionado"),
    turma_id: Yup.string().required("Turma não selecionada"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await criarAlunoTurma(values);
      alert("Aluno vinculado à turma com sucesso!");
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao salvar vínculo");
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
            <h3>Atribuir Turma</h3>

            <Campos>
              <Label htmlFor="pessoa_nome">Nome:</Label>
              <Field name="pessoa_id">
                {({ form }) => {
                  const meta = form.getFieldMeta("pessoa_id");
                  return (
                    <Input
                      type="text"
                      id="pessoa_nome"
                      name="pessoa_nome"
                      value={form.values.pessoa_nome}
                      readOnly
                      error={meta.touched && meta.error ? meta.error : ""}
                    />
                  );
                }}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="pessoa_email">Email:</Label>
              <Field name="pessoa_id">
                {({ form }) => {
                  const meta = form.getFieldMeta("pessoa_id");
                  return (
                    <Input
                      type="email"
                      id="pessoa_email"
                      name="pessoa_email"
                      value={form.values.pessoa_email}
                      readOnly
                      error={meta.touched && meta.error ? meta.error : ""}
                    />
                  );
                }}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="pessoa_cpf">CPF:</Label>
              <Field name="pessoa_id">
                {({ form }) => {
                  const meta = form.getFieldMeta("pessoa_id");
                  return (
                    <Input
                      type="text"
                      id="pessoa_cpf"
                      name="pessoa_cpf"
                      value={form.values.pessoa_cpf}
                      readOnly
                      error={meta.touched && meta.error ? meta.error : ""}
                    />
                  );
                }}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="turma_nome">Turma:</Label>
              <Field name="turma_id">
                {({ form }) => {
                  const meta = form.getFieldMeta("turma_id");
                  return (
                    <Input
                      type="text"
                      id="turma_nome"
                      name="turma_nome"
                      value={form.values.turma_nome}
                      readOnly
                      error={meta.touched && meta.error ? meta.error : ""}
                    />
                  );
                }}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="turma_turno">Turno:</Label>
              <Field name="turma_id">
                {({ form }) => {
                  const meta = form.getFieldMeta("turma_id");
                  return (
                    <Input
                      type="text"
                      id="turma_turno"
                      name="turma_turno"
                      value={form.values.turma_turno}
                      readOnly
                      error={meta.touched && meta.error ? meta.error : ""}
                    />
                  );
                }}
              </Field>
            </Campos>

            <div style={{ display: "flex", gap: 8 }}>
              <Btn_Add type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Adicionar à Turma"}
              </Btn_Add>
            </div>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AlunoTurma;
