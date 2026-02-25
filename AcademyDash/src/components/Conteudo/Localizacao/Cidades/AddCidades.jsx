import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";
import Btn_Add from "../../BodyCrud/Btn_Add";
import Label from "../../../Core/Label";
import Input from "../../../Core/Input";

import { getEstados } from "@/services/estados";
import { criarCidade } from "@/services/cidades";

const AddCidades = () => {
  const navigate = useNavigate();
  const [listaEstados, setListaEstados] = useState([]);

  useEffect(() => {
    getEstados()
      .then(setListaEstados)
      .catch((err) => console.error("Erro ao carregar estados:", err));
  }, []);

  const initialValues = {
    cidade: "",
    ddd: "",
    estado_id: "",
  };

  const validationSchema = Yup.object({
    cidade: Yup.string().required("O nome da cidade é obrigatório"),
    ddd: Yup.string()
      .matches(/^\d+$/, "DDD deve conter apenas números")
      .required("DDD é obrigatório"),
    estado_id: Yup.string().required("Selecione um estado"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await criarCidade(values);
      alert("Cidade cadastrada com sucesso!");
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Area className="add-cidade">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <AddForm onSubmit={handleSubmit}>
            <h3>Adicionar Nova Cidade</h3>

            <Campos>
              <Label htmlFor="cidade">Cidade:</Label>
              <Field name="cidade">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="cidade"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="ddd">DDD:</Label>
              <Field name="ddd">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="ddd"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="estado_id">Estado:</Label>
              <Field name="estado_id">
                {({ field, meta }) => (
                  <div className="relative flex flex-col">
                    <select
                      {...field}
                      id="estado_id"
                      className={`input border-b p-2 ${
                        meta.touched && meta.error
                          ? "border-red-500"
                          : "border-black"
                      }`}
                    >
                      <option value="">Selecione...</option>
                      {listaEstados.map((estado) => (
                        <option key={estado.id} value={estado.id}>
                          {estado.estado} ({estado.sigla})
                        </option>
                      ))}
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
              {isSubmitting ? "Salvando..." : "Adicionar Cidade"}
            </Btn_Add>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddCidades;
