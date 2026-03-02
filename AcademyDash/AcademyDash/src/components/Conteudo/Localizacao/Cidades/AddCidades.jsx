import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../../BodyCrud/area";
import AddForm from "../../BodyCrud/AddForm";
import Campos from "../../BodyCrud/Campos";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { getEstados } from "@/services/estados";
import { criarCidade } from "@/services/cidades";

const AddCidades = () => {
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
        {({
          handleSubmit,
          isSubmitting,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <AddForm onSubmit={handleSubmit}>
            <Campos>
              <Label htmlFor="cidade">Cidade</Label>
              <Field name="cidade">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="cidade"
                    placeholder="Digite o nome da cidade"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.cidade && errors.cidade && (
                <span className="text-red-500 text-sm">{errors.cidade}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="ddd">DDD</Label>
              <Field name="ddd">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="ddd"
                    placeholder="Digite o DDD (ex: 45)"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.ddd && errors.ddd && (
                <span className="text-red-500 text-sm">{errors.ddd}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="estado_id">Estado</Label>
              <Select
                value={values.estado_id}
                onValueChange={(value) => setFieldValue("estado_id", value)}
              >
                <SelectTrigger
                  id="estado_id"
                  className="w-full text-gray-900 bg-white"
                >
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {listaEstados.map((estado) => (
                    <SelectItem key={estado.id} value={String(estado.id)}>
                      {estado.estado} ({estado.sigla})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.estado_id && errors.estado_id && (
                <span className="text-red-500 text-sm">{errors.estado_id}</span>
              )}
            </Campos>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Salvando..." : "Adicionar Cidade"}
            </Button>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddCidades;
