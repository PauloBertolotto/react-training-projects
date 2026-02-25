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

import { getPaises } from "@/services/paises";
import { criarEstado } from "@/services/estados";

const AddEstados = () => {
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    getPaises()
      .then(setPaises)
      .catch((err) => console.error("Erro ao carregar países:", err));
  }, []);

  const initialValues = {
    estado: "",
    sigla: "",
    pais_id: "",
  };

  const validationSchema = Yup.object({
    estado: Yup.string().required("O nome do estado é obrigatório"),
    sigla: Yup.string()
      .length(2, "A sigla deve ter exatamente 2 letras")
      .required("A sigla é obrigatória"),
    pais_id: Yup.string().required("Selecione um país"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await criarEstado(values);
      alert("Estado cadastrado com sucesso!");
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
            <h3>Adicionar Novo Estado</h3>

            <Campos>
              <Label htmlFor="estado">Estado:</Label>
              <Field name="estado">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="estado"
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
              <Label htmlFor="pais_id">País:</Label>
              <Field name="pais_id">
                {({ field, meta }) => (
                  <div className="relative flex flex-col">
                    <select
                      {...field}
                      id="pais_id"
                      className={`input border-b p-2 ${
                        meta.touched && meta.error
                          ? "border-red-500"
                          : "border-black"
                      }`}
                    >
                      <option value="">Selecione...</option>
                      {paises.map((pais) => (
                        <option key={pais.id} value={pais.id}>
                          {pais.pais}
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
              {isSubmitting ? "Salvando..." : "Adicionar Estado"}
            </Btn_Add>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddEstados;
