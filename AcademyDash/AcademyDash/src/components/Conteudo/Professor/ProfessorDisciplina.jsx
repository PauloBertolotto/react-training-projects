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
  buscarProfessorComDisciplinaPorId,
} from "@/services/professores";

const ProfessorDisciplina = ({ professor, onVoltar }) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [fetched, setFetched] = useState(null);
  const [loadingFetch, setLoadingFetch] = useState(false);

  // Normalização dos dados
  const prof = {
    pessoa_id:
      professor?.pessoa_id ?? professor?.pessoa?.id ?? professor?.id ?? "",
    pessoa_nome:
      professor?.pessoa_nome ??
      professor?.pessoa?.nome ??
      professor?.nome ??
      "",
    pessoa_email:
      professor?.pessoa_email ??
      professor?.pessoa?.email ??
      professor?.email ??
      "",
    especialidade:
      professor?.especialidade ?? professor?.professor?.especialidade ?? "",
    titulo: professor?.titulo ?? professor?.professor?.titulo ?? "",
    disciplina_id: professor?.disciplina_id ?? professor?.disciplina?.id ?? "",
  };

  useEffect(() => {
    getDisciplinas()
      .then((res) => {
        const data = res?.data ?? res;
        setDisciplinas(Array.isArray(data) ? data : []);
      })
      .catch(() => alert("Erro ao carregar disciplinas"));
  }, []);

  useEffect(() => {
    if (!prof.pessoa_id) return;

    setLoadingFetch(true);

    buscarProfessorComDisciplinaPorId(prof.pessoa_id)
      .then((resp) => {
        const data = resp?.data ?? resp;

        const disciplinaId =
          data?.disciplina_id ??
          data?.Disciplina?.id ??
          data?.professor_disciplina?.[0]?.disciplina_id ??
          data?.professor_disciplina?.[0]?.Disciplina?.id ??
          "";

        console.log("DADOS BACKEND:", data);
        console.log("professor_disciplina:", data?.professor_disciplina);
        console.log("disciplina direto:", data?.disciplina);

        setFetched({
          pessoa_id: prof.pessoa_id,
          pessoa_nome: data?.pessoa?.nome ?? data?.Pessoa?.nome ?? "",
          pessoa_email: data?.pessoa?.email ?? data?.Pessoa?.email ?? "",
          especialidade: data?.especialidade ?? "",
          titulo: data?.titulo ?? "",
          disciplina_id: disciplinaId ? String(disciplinaId) : "",
        });
      })
      .finally(() => setLoadingFetch(false));
  }, [prof.pessoa_id]);

  // Verifica se o id da disciplina existe na lista
  const disciplinaValida = (id) => {
    if (!id) return "";
    return disciplinas.find((d) => String(d.id) === String(id))
      ? String(id)
      : "";
  };

  const initialValues = {
    pessoa_id: fetched?.pessoa_id || prof.pessoa_id,
    pessoa_nome: fetched?.pessoa_nome || prof.pessoa_nome,
    pessoa_email: fetched?.pessoa_email || prof.pessoa_email,
    especialidade: fetched?.especialidade || prof.especialidade,
    titulo: fetched?.titulo || prof.titulo,
    disciplina_id: disciplinaValida(
      fetched?.disciplina_id || prof.disciplina_id,
    ),
  };

  const validationSchema = Yup.object({
    pessoa_id: Yup.string().required("Professor não selecionado"),
    disciplina_id: Yup.string().required("Disciplina não selecionada"),
    especialidade: Yup.string().min(3).max(100).required(),
    titulo: Yup.string().min(2).max(100).required(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      if (!fetched?.especialidade && !fetched?.titulo) {
        await criarProfessor({
          pessoa_id: values.pessoa_id,
          disciplina_id: values.disciplina_id,
          especialidade: values.especialidade,
          titulo: values.titulo,
          status: "ativo",
        });
        alert("Professor vinculado à disciplina com sucesso!");
      } else if (
        values.disciplina_id !==
        String(fetched?.disciplina_id ?? prof.disciplina_id ?? "")
      ) {
        await atualizarProfessorDisciplina(values.pessoa_id, {
          disciplina_id: values.disciplina_id,
        });
        alert("Disciplina atualizada com sucesso!");
      } else {
        await atualizarProfessor(values.pessoa_id, {
          especialidade: values.especialidade,
          titulo: values.titulo,
        });
        alert("Dados atualizados com sucesso!");
      }

      if (onVoltar) onVoltar();
    } catch (error) {
      alert("Erro ao salvar");
    } finally {
      setSubmitting(false);
    }
  };

  const formKey = `${initialValues.pessoa_id}-${initialValues.disciplina_id}-${disciplinas.length}`;

  return (
    <Area>
      <Formik
        key={formKey}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
          <AddForm onSubmit={handleSubmit}>
            <Campos>
              <Label>Nome</Label>
              <Input
                value={values.pessoa_nome}
                readOnly
                className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
              />
            </Campos>

            <Campos>
              <Label>Email</Label>
              <Input
                value={values.pessoa_email}
                readOnly
                className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
              />
            </Campos>

            <Campos>
              <Label>Especialidade</Label>
              <Field name="especialidade">
                {({ field }) => (
                  <Input
                    {...field}
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label>Título</Label>
              <Field name="titulo">
                {({ field }) => (
                  <Input
                    {...field}
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label>Disciplina</Label>
              <Select
                value={values.disciplina_id}
                onValueChange={(v) => setFieldValue("disciplina_id", v)}
              >
                <SelectTrigger className="w-full text-gray-900 placeholder:text-gray-400 bg-white">
                  <SelectValue placeholder="Selecione uma disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {disciplinas.map((d) => (
                    <SelectItem
                      key={d.id}
                      value={String(d.id)}
                      className="text-gray-900"
                    >
                      {d.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Campos>

            <Button type="submit" disabled={isSubmitting || loadingFetch}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default ProfessorDisciplina;
