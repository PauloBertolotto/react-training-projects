import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Add from "../BodyCrud/Btn_Add";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { getCidades } from "@/services/cidades";
import { criarPessoaComEndereco } from "@/services/pessoas";

const AddUsuario = () => {
  const [cidades, setCidades] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCidades()
      .then(setCidades)
      .catch((err) => {
        console.error("Erro ao carregar cidades:", err);
        alert("Erro ao carregar cidades");
      });
  }, []);

  const initialValues = {
    nome: "",
    email: "",
    cpf: "",
    data_nascimento: "",
    genero: "",
    acesso: "",
    rg: "",
    telefone: "",
    cep: "",
    numero: "",
    complemento: "",
    cidade_id: "",
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    cpf: Yup.string()
      .matches(/^\d{11}$/, "CPF deve ter 11 dígitos numéricos")
      .required("CPF é obrigatório"),
    rg: Yup.string()
      .transform((value) => (value === "" ? null : value))
      .nullable()
      .test("rg-format", "RG deve conter entre 7 e 14 dígitos", (value) => {
        if (!value) return true;
        return /^\d{7,14}$/.test(value);
      }),
    data_nascimento: Yup.date()
      .required("Preencha aqui")
      .test(
        "idade-minima",
        "Usuários menores de 5 anos não podem se cadastrar",
        function (value) {
          if (!value) return false;
          const hoje = new Date();
          const nascimento = new Date(value);
          let idade = hoje.getFullYear() - nascimento.getFullYear();
          const mes = hoje.getMonth() - nascimento.getMonth();
          if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
          }
          return idade >= 5;
        },
      ),
    genero: Yup.string()
      .oneOf(["M", "F", "O", ""], "Gênero inválido")
      .nullable(),
    acesso: Yup.string().required("Selecione"),
    telefone: Yup.string()
      .matches(/^\d{9,10}$/, "Telefone deve ter 9 ou 10 dígitos")
      .nullable(),
    cep: Yup.string()
      .matches(/^\d{7,8}$/, "CEP deve ter 8 dígitos")
      .required("CEP é obrigatório"),
    numero: Yup.string().required("Número é obrigatório"),
    complemento: Yup.string().max(100, "Complemento muito longo"),
    cidade_id: Yup.string().required("Selecione uma cidade"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await criarPessoaComEndereco(values);
      alert("Usuário cadastrado com sucesso!");
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Area className="add-usuario">
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
              <Label htmlFor="nome">Nome</Label>
              <Field name="nome">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="nome"
                    placeholder="Digite o nome completo"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.nome && errors.nome && (
                <span className="text-red-500 text-sm">{errors.nome}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="email">Email</Label>
              <Field name="email">
                {({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    placeholder="Digite o email"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.email && errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="cpf">CPF</Label>
              <Field name="cpf">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="cpf"
                    placeholder="Digite o CPF (11 dígitos)"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.cpf && errors.cpf && (
                <span className="text-red-500 text-sm">{errors.cpf}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="rg">RG</Label>
              <Field name="rg">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="rg"
                    placeholder="Digite o RG"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.rg && errors.rg && (
                <span className="text-red-500 text-sm">{errors.rg}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="data_nascimento">Data de Nascimento</Label>
              <Field name="data_nascimento">
                {({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    id="data_nascimento"
                    className="w-full text-gray-900 bg-white"
                  />
                )}
              </Field>
              {touched.data_nascimento && errors.data_nascimento && (
                <span className="text-red-500 text-sm">
                  {errors.data_nascimento}
                </span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="genero">Gênero</Label>
              <Field name="genero">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="genero"
                    placeholder="Digite o gênero"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.genero && errors.genero && (
                <span className="text-red-500 text-sm">{errors.genero}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="acesso">Acesso</Label>
              <Select
                value={values.acesso || undefined}
                onValueChange={(value) => setFieldValue("acesso", value)}
              >
                <SelectTrigger
                  id="acesso"
                  className="w-full text-gray-900 bg-white"
                >
                  <SelectValue placeholder="Selecione o nível de acesso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="aluno">Aluno</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                </SelectContent>
              </Select>
              {touched.acesso && errors.acesso && (
                <span className="text-red-500 text-sm">{errors.acesso}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="telefone">Telefone</Label>
              <Field name="telefone">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="telefone"
                    placeholder="Digite o telefone (10 ou 11 dígitos)"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.telefone && errors.telefone && (
                <span className="text-red-500 text-sm">{errors.telefone}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="cep">CEP</Label>
              <Field name="cep">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="cep"
                    placeholder="Digite o CEP (8 dígitos)"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.cep && errors.cep && (
                <span className="text-red-500 text-sm">{errors.cep}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="numero">Número</Label>
              <Field name="numero">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="numero"
                    placeholder="Digite o número"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.numero && errors.numero && (
                <span className="text-red-500 text-sm">{errors.numero}</span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="complemento">Complemento</Label>
              <Field name="complemento">
                {({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="complemento"
                    placeholder="Digite o complemento"
                    className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
                  />
                )}
              </Field>
              {touched.complemento && errors.complemento && (
                <span className="text-red-500 text-sm">
                  {errors.complemento}
                </span>
              )}
            </Campos>

            <Campos>
              <Label htmlFor="cidade_id">Cidade</Label>
              <Select
                value={values.cidade_id || undefined}
                onValueChange={(value) => setFieldValue("cidade_id", value)}
              >
                <SelectTrigger
                  id="cidade_id"
                  className="w-full text-gray-900 bg-white"
                >
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cidades.map((cidade) => (
                    <SelectItem key={cidade.id} value={String(cidade.id)}>
                      {cidade.cidade} - {cidade.sigla}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.cidade_id && errors.cidade_id && (
                <span className="text-red-500 text-sm">{errors.cidade_id}</span>
              )}
            </Campos>

            <Btn_Add type="submit" disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Salvando..." : "Adicionar Usuário"}
            </Btn_Add>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddUsuario;
