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

import { getPaises } from "@/services/paises";
import { criarEstado } from "@/services/estados";

const AddEstados = () => {
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
              <Label htmlFor="estado">Estado</Label>
              <Field name="estado">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="estado"
                    placeholder="Digite o nome do estado"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.estado && errors.estado && (
                <span className="text-red-500 text-sm">{errors.estado}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="sigla">Sigla</Label>
              <Field name="sigla">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="sigla"
                    placeholder="Digite a sigla (ex: PR)"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.sigla && errors.sigla && (
                <span className="text-red-500 text-sm">{errors.sigla}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="pais_id">País</Label>
              <Select
                value={values.pais_id}
                onValueChange={(value) => setFieldValue("pais_id", value)}
              >
                <SelectTrigger
                  id="pais_id"
                  className="w-full text-gray-900 bg-white"
                >
                  <SelectValue placeholder="Selecione o país" />
                </SelectTrigger>
                <SelectContent>
                  {paises.map((pais) => (
                    <SelectItem key={pais.id} value={String(pais.id)}>
                      {pais.pais}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.pais_id && errors.pais_id && (
                <span className="text-red-500 text-sm">{errors.pais_id}</span>
              )}
            </Campos>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Salvando..." : "Adicionar Estado"}
            </Button>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddEstados;
