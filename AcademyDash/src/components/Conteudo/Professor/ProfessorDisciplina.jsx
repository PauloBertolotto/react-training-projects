import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Alt from "../BodyCrud/Btn_Alt";

import Label from "../../Core/Label";
import Input from "../../Core/Input";

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
    disciplina_id: professor?.disciplina_id || disciplinaVinculo?.id || "",
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
        {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
          <AddForm onSubmit={handleSubmit}>
            <h3>Atribuir Disciplina</h3>

            <Campos>
              <Label htmlFor="pessoa_nome">Nome:</Label>
              <Input type="text" value={values.pessoa_nome} readOnly />
            </Campos>

            <Campos>
              <Label htmlFor="pessoa_email">Email:</Label>
              <Input type="email" value={values.pessoa_email} readOnly />
            </Campos>

            <Campos>
              <Label htmlFor="pessoa_cpf">CPF:</Label>
              <Input type="text" value={values.pessoa_cpf} readOnly />
            </Campos>

            <Campos>
              <Label htmlFor="especialidade">Especialidade:</Label>
              <Field name="especialidade">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="especialidade"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="titulo">Título:</Label>
              <Field name="titulo">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="titulo"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="disciplina_id">Disciplina:</Label>
              <Field name="disciplina_id">
                {({ field }) => (
                  <select
                    {...field}
                    id="disciplina_id"
                    onChange={(e) => {
                      setFieldValue("disciplina_id", e.target.value);
                      const selected = disciplinas.find(
                        (d) => String(d.id) === String(e.target.value),
                      );
                      setFieldValue(
                        "carga_horaria",
                        selected?.carga_horaria || "",
                      );
                    }}
                  >
                    <option value="">Selecione uma disciplina</option>
                    {disciplinas.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nome}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="carga_horaria">Carga Horária:</Label>
              <Field name="carga_horaria">
                {({ field }) => (
                  <Input {...field} type="text" id="carga_horaria" readOnly />
                )}
              </Field>
            </Campos>

            <Btn_Alt type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : professor?.especialidade || professor?.titulo
                  ? "Atualizar"
                  : "Adicionar à Disciplina"}
            </Btn_Alt>

            {onVoltar && (
              <button
                type="button"
                onClick={onVoltar}
                className="bg-gray-500 text-white px-3 py-1 rounded mt-3"
              >
                Voltar
              </button>
            )}
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default ProfessorDisciplina;
