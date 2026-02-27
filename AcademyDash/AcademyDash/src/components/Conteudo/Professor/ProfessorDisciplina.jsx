import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";

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

import { getDisciplinas } from "@/services/disciplinas";
import {
  criarProfessor,
  atualizarProfessor,
  atualizarProfessorDisciplina,
} from "@/services/professores";

const ProfessorDisciplina = ({ professor, onVoltar }) => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    getDisciplinas()
      .then(setDisciplinas)
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar disciplinas");
      });
  }, []);

  const disciplinaVinculo = professor?.professor_disciplina?.[0]?.Disciplina;

  const initialValues = {
    pessoa_id: professor?.id || "",
    pessoa_nome: professor?.Pessoa?.nome || professor?.pessoa_nome || "",
    pessoa_email: professor?.Pessoa?.email || professor?.pessoa_email || "",
    pessoa_cpf: professor?.Pessoa?.cpf || professor?.pessoa_cpf || "",
    especialidade: professor?.especialidade || "",
    titulo: professor?.titulo || "",
    disciplina_id:
      professor?.disciplina_id || disciplinaVinculo?.id || undefined,
    carga_horaria:
      disciplinaVinculo?.carga_horaria || professor?.carga_horaria || "",
  };

  const validationSchema = Yup.object({
    pessoa_id: Yup.string().required("Professor não selecionado"),
    disciplina_id: Yup.string().required("Disciplina não selecionada"),
    especialidade: Yup.string()
      .trim()
      .min(3)
      .max(100)
      .required("Especialidade é obrigatória"),
    titulo: Yup.string()
      .trim()
      .min(2)
      .max(100)
      .required("Título é obrigatório"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      if (!professor?.especialidade && !professor?.titulo) {
        await criarProfessor({
          pessoa_id: values.pessoa_id,
          disciplina_id: values.disciplina_id,
          especialidade: values.especialidade,
          titulo: values.titulo,
          status: "ativo",
        });
        alert("Professor vinculado à disciplina com sucesso!");
      } else if (
        values.disciplina_id &&
        values.disciplina_id !==
          (professor?.disciplina_id ||
            professor?.professor_disciplina?.[0]?.disciplina_id)
      ) {
        await atualizarProfessorDisciplina(values.pessoa_id, {
          disciplina_id: values.disciplina_id,
        });
        alert("Disciplina do professor atualizada com sucesso!");
      } else {
        await atualizarProfessor(values.pessoa_id, {
          especialidade: values.especialidade,
          titulo: values.titulo,
        });
        alert("Dados do professor atualizados com sucesso!");
      }

      if (onVoltar) onVoltar();
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao salvar professor e vínculo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Area>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
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
              <Label htmlFor="pessoa_nome">Nome</Label>
              <Input
                type="text"
                value={values.pessoa_nome}
                readOnly
                className="w-full text-gray-900 bg-white"
              />
            </Campos>

            <Campos>
              <Label htmlFor="pessoa_email">Email</Label>
              <Input
                type="email"
                value={values.pessoa_email}
                readOnly
                className="w-full text-gray-900 bg-white"
              />
            </Campos>

            <Campos>
              <Label htmlFor="pessoa_cpf">CPF</Label>
              <Input
                type="text"
                value={values.pessoa_cpf}
                readOnly
                className="w-full text-gray-900 bg-white"
              />
            </Campos>

            <Campos>
              <Label htmlFor="especialidade">Especialidade</Label>
              <Field name="especialidade">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="especialidade"
                    placeholder="Digite a especialidade"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.especialidade && errors.especialidade && (
                <span className="text-red-500 text-sm">
                  {errors.especialidade}
                </span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="titulo">Título</Label>
              <Field name="titulo">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="titulo"
                    placeholder="Digite o título"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.titulo && errors.titulo && (
                <span className="text-red-500 text-sm">{errors.titulo}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="disciplina_id">Disciplina</Label>
              <Select
                value={values.disciplina_id || undefined}
                onValueChange={(value) => {
                  setFieldValue("disciplina_id", value);
                  const selected = disciplinas.find(
                    (d) => String(d.id) === String(value),
                  );
                  setFieldValue("carga_horaria", selected?.carga_horaria || "");
                }}
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
                      {d.nome}
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

            <Campos>
              <Label htmlFor="carga_horaria">Carga Horária</Label>
              <Field name="carga_horaria">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="carga_horaria"
                    readOnly
                    className="w-full text-gray-900 bg-white"
                  />
                )}
              </Field>
            </Campos>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              {isSubmitting
                ? "Salvando..."
                : professor?.especialidade || professor?.titulo
                  ? "Atualizar"
                  : "Adicionar à Disciplina"}
            </Button>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default ProfessorDisciplina;
