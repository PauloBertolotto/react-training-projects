import React from "react";
import { useNavigate } from "react-router-dom";
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
            <Campos>
              <Label htmlFor="pais">País</Label>
              <Field name="pais">
                {({ field, meta }) => (
                  <>
                    <Input
                      {...field}
                      id="pais"
                      type="text"
                      placeholder="Brasil"
                    />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="sigla">Sigla</Label>
              <Field name="sigla">
                {({ field, meta }) => (
                  <>
                    <Input {...field} id="sigla" type="text" placeholder="BR" />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="ddi">DDI</Label>
              <Field name="ddi">
                {({ field, meta }) => (
                  <>
                    <Input {...field} id="ddi" type="text" placeholder="55" />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="moeda">Moeda</Label>
              <Field name="moeda">
                {({ field, meta }) => (
                  <>
                    <Input
                      {...field}
                      id="moeda"
                      type="text"
                      placeholder="Real"
                    />
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="continente">Continente</Label>
              <Field name="continente">
                {({ field, meta, form }) => (
                  <>
                    <Select
                      onValueChange={(value) =>
                        form.setFieldValue("continente", value)
                      }
                      value={field.value}
                    >
                      <SelectTrigger id="continente">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa">África</SelectItem>
                        <SelectItem value="America do Norte">
                          América do Norte
                        </SelectItem>
                        <SelectItem value="America Central">
                          América Central
                        </SelectItem>
                        <SelectItem value="America do Sul">
                          América do Sul
                        </SelectItem>
                        <SelectItem value="Antartida">Antártida</SelectItem>
                        <SelectItem value="Asia">Ásia</SelectItem>
                        <SelectItem value="Europa">Europa</SelectItem>
                        <SelectItem value="Oceania">Oceania</SelectItem>
                      </SelectContent>
                    </Select>
                    {meta.touched && meta.error && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </Campos>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Salvando..." : "Adicionar País"}
            </Button>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddPaises;
