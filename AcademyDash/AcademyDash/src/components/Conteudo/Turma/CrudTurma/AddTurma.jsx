import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";
import Btn_Add from "../../BodyCrud/Btn_Add";

import Label from "../../../Core/Label";
import Input from "../../../Core/Input";

const AddTurma = () => {
  const navigate = useNavigate();

  const initialValues = {
    nome: "",
    ano: "",
    turno: "",
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome da turma é obrigatório"),
    ano: Yup.number()
      .typeError("Ano inválido")
      .integer("Ano inválido")
      .min(1900, "Ano inválido")
      .max(2100, "Ano inválido")
      .required("Ano é obrigatório"),
    turno: Yup.string().required("Selecione o turno"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const payload = {
        nome: values.nome,
        ano: Number(values.ano),
        turno: values.turno,
      };

      const response = await fetch("http://localhost:3333/turmas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message || "Erro ao criar turma");
      }

      alert("Turma cadastrada com sucesso!");
      resetForm();
      // se quiser navegar após criar:
      // navigate("/turmas");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Area className="add-turma">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <AddForm onSubmit={handleSubmit}>
            <Campos>
              <Label htmlFor="nome">Nome da Turma:</Label>
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

            <Campos className="campo-turma">
              <Label htmlFor="ano">Ano Letivo:</Label>
              <Field name="ano">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="ano"
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

            <Campos className="campo-turma">
              <Label htmlFor="turno">Turno:</Label>
              <Field name="turno">
                {({ field, meta }) => (
                  <div
                    className="relative"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <select
                      {...field}
                      id="turno"
                      className={`input border-b p-2 ${meta.touched && meta.error ? "border-red-500" : "border-black"}`}
                      aria-invalid={
                        meta.touched && meta.error ? true : undefined
                      }
                      aria-describedby={
                        meta.touched && meta.error ? "turno-error" : undefined
                      }
                      style={{
                        paddingRight:
                          meta.touched && meta.error ? "3.5rem" : undefined,
                      }}
                    >
                      <option value="">Selecione...</option>
                      <option value="Manhã">Manhã</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noite">Noite</option>
                    </select>

                    {meta.touched && meta.error && (
                      <span
                        id="turno-error"
                        className="text-red-500 text-sm"
                        style={{
                          position: "absolute",
                          right: "0.5rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {meta.error}
                      </span>
                    )}
                  </div>
                )}
              </Field>
            </Campos>

            <Btn_Add type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Adicionar Turma"}
            </Btn_Add>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddTurma;
