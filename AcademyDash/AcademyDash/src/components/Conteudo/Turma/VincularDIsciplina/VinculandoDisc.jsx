import React, { useEffect, useState } from "react";
import { Formik } from "formik";
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
import SubTitle from "@/components/Core/SubTitle";

const VinculandoDisc = ({ turma, onVoltar }) => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const carregarDisciplinas = async () => {
      try {
        const res = await fetch(
          "http://localhost:3333/disciplinas?status=ativa",
        );
        if (!res.ok) throw new Error("Erro ao carregar disciplinas");
        const data = await res.json();
        setDisciplinas(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar disciplinas");
      }
    };
    carregarDisciplinas();
  }, []);

  const initialValues = {
    turma_id: turma?.id || "",
    disciplina_id: "",
  };

  const validationSchema = Yup.object({
    turma_id: Yup.string().required("Selecione uma turma"),
    disciplina_id: Yup.string().required("Selecione uma disciplina"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:3333/turma-disciplina", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(
          err?.message || "Erro ao salvar vínculo turma-disciplina",
        );
      }

      await response.json();
      alert("Disciplina vinculada à turma com sucesso!");

      if (onVoltar) onVoltar();
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao salvar vínculo turma-disciplina");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Area>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          isSubmitting,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <AddForm onSubmit={handleSubmit}>
            <Campos>
              <Label>Turma</Label>
              <Input
                type="text"
                value={turma?.nome || ""}
                readOnly
                className="w-full text-gray-900 bg-white"
              />
            </Campos>

            <Campos>
              <Label htmlFor="disciplina_id">Disciplina</Label>
              <Select
                value={values.disciplina_id || undefined}
                onValueChange={(value) => setFieldValue("disciplina_id", value)}
              >
                <SelectTrigger
                  id="disciplina_id"
                  className="w-full text-gray-900 bg-white"
                >
                  <SelectValue placeholder="Selecione uma disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {disciplinas.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.nome} — {d.carga_horaria}h
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.disciplina_id && errors.disciplina_id && (
                <span className="text-red-500 text-sm">
                  {errors.disciplina_id}
                </span>
              )}
            </Campos>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Salvando..." : "Vincular"}
            </Button>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default VinculandoDisc;
