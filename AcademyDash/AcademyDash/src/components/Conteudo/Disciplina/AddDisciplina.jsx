import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
            <Campos>
              <Label htmlFor="nome">Disciplina</Label>
              <Field name="nome">
                {({ field, meta }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      id="nome"
                      placeholder="Digite o nome da disciplina"
                      className="w-full text-gray-900 bg-white placeholder:text-gray-400"
                    />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="carga_horaria">Carga Horária</Label>
              <Field name="carga_horaria">
                {({ field, meta }) => (
                  <>
                    <Input
                      {...field}
                      type="number"
                      id="carga_horaria"
                      placeholder="Digite a carga horária (em horas)"
                      className="w-full text-gray-900 bg-white placeholder:text-gray-400"
                    />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </Campos>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Salvando..." : "Adicionar Disciplina"}
            </Button>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddDisciplina;
