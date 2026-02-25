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

import { criarPais } from "@/services/paises";

const AddPaises = () => {
  const navigate = useNavigate();

  const initialValues = {
    pais: "",
    sigla: "",
    continente: "",
    ddi: "",
    moeda: "",
  };

  const validationSchema = Yup.object({
    pais: Yup.string().required("O nome do país é obrigatório"),
    sigla: Yup.string()
      .length(2, "A sigla deve ter exatamente 2 letras")
      .required("A sigla é obrigatória"),
    ddi: Yup.string()
      .matches(/^\d+$/, "DDI deve conter apenas números")
      .required("DDI é obrigatório"),
    moeda: Yup.string().required("Moeda é obrigatória"),
    continente: Yup.string().required("Selecione um continente"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await criarPais(values);
      alert("País cadastrado com sucesso!");
      resetForm();
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
            <h3>Adicionar Novo País</h3>

            <Campos>
              <Label htmlFor="pais">País:</Label>
              <Field name="pais">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="pais"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="sigla">Sigla:</Label>
              <Field name="sigla">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="sigla"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="ddi">DDI:</Label>
              <Field name="ddi">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="ddi"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="moeda">Moeda:</Label>
              <Field name="moeda">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="moeda"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="continente">Continente:</Label>
              <Field name="continente">
                {({ field, meta }) => (
                  <div className="relative flex flex-col">
                    <select
                      {...field}
                      id="continente"
                      className={`input border-b p-2 ${
                        meta.touched && meta.error
                          ? "border-red-500"
                          : "border-black"
                      }`}
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
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm absolute right-0 top-1/2 transform -translate-y-1/2">
                        {meta.error}
                      </span>
                    )}
                  </div>
                )}
              </Field>
            </Campos>

            <Btn_Add type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Adicionar País"}
            </Btn_Add>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddPaises;
