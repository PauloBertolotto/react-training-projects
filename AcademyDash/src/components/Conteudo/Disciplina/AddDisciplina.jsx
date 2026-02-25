import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Add from "../BodyCrud/Btn_Add";

import Label from "../../Core/Label";
import Input from "../../Core/Input";

const AddDisciplina = () => {
  const navigate = useNavigate();

  const initialValues = {
    nome: "",
    carga_horaria: "",
  };

  const validationSchema = Yup.object({
    nome: Yup.string().trim().required("Nome da disciplina é obrigatório"),
    carga_horaria: Yup.number()
      .typeError("Carga horária deve ser um número")
      .integer("Carga horária deve ser um número inteiro")
      .positive("Carga horária deve ser maior que zero")
      .required("Carga horária é obrigatória"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      const payload = {
        nome: values.nome.trim(),
        carga_horaria: Number(values.carga_horaria),
      };

      const response = await fetch("http://localhost:3333/disciplinas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const erro = await response.json().catch(() => null);
        throw new Error(erro?.message || "Erro ao criar disciplina");
      }

      alert("Disciplina cadastrada com sucesso!");
      resetForm();
      // navigate("/disciplinas"); // descomente se quiser redirecionar
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao criar disciplina");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Area className="add-disciplina">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <AddForm onSubmit={handleSubmit}>
            <h3>Adicionar Nova Disciplina</h3>

            <Campos>
              <Label htmlFor="nome">Disciplina:</Label>
              <Field name="nome">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="nome"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="carga_horaria">Carga Horária:</Label>
              <Field name="carga_horaria">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="carga_horaria"
                    maxLength={4}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      field.onChange({
                        target: { name: field.name, value: onlyDigits },
                      });
                    }}
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Btn_Add type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Adicionar Disciplina"}
            </Btn_Add>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddDisciplina;
