import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Add from "../BodyCrud/Btn_Add";
import Label from "../../Core/Label";
import Input from "../../Core/Input";
import { getCidades } from "@/services/cidades";
import { criarPessoaComEndereco } from "@/services/pessoas";

const AddUsuario = () => {
  const [logradouro, setLogradouro] = useState("");
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
      .oneOf(["masculino", "feminino", "outro", ""], "Gênero inválido")
      .nullable(),
    acesso: Yup.string().required("Selecione"),
    telefone: Yup.string()
      .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos")
      .nullable(),
    cep: Yup.string()
      .matches(/^\d{8}$/, "CEP deve ter 8 dígitos")
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
      setLogradouro("");
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
        {({ handleSubmit, isSubmitting }) => (
          <AddForm onSubmit={handleSubmit}>
            <h3>Adicionar Novo Usuário</h3>

            {/* Pessoa */}
            <Campos>
              <Label htmlFor="nome">Nome:</Label>
              <Field name="nome">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="nome"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="email">Email:</Label>
              <Field name="email">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="cpf">CPF:</Label>
              <Field name="cpf">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="cpf"
                    maxLength={11}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      field.onChange({
                        target: { name: field.name, value: onlyDigits },
                      });
                    }}
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="rg">RG:</Label>
              <Field name="rg">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="rg"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="data_nascimento">Data de Nascimento:</Label>
              <Field name="data_nascimento">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="date"
                    id="data_nascimento"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="genero">Gênero:</Label>
              <Field name="genero">
                {({ field, meta }) => (
                  <div className="relative flex flex-col">
                    <select
                      {...field}
                      id="genero"
                      className={`input border-b p-2 ${meta.touched && meta.error ? "border-red-500" : "border-black"}`}
                    >
                      <option value="">Selecione...</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
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

            <Campos>
              <Label htmlFor="acesso">Acesso:</Label>
              <Field name="acesso">
                {({ field, meta }) => (
                  <div className="relative flex flex-col">
                    <select
                      {...field}
                      id="acesso"
                      className={`input border-b p-2 ${meta.touched && meta.error ? "border-red-500" : "border-black"}`}
                    >
                      <option value="">Selecione...</option>
                      <option value="admin">admin</option>
                      <option value="aluno">aluno</option>
                      <option value="professor">professor</option>
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

            <Campos>
              <Label htmlFor="telefone">Telefone:</Label>
              <Field name="telefone">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="telefone"
                    maxLength={11}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      field.onChange({
                        target: { name: field.name, value: onlyDigits },
                      });
                    }}
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            {/* Endereço */}
            <Campos>
              <Label htmlFor="cidade_id">Cidade:</Label>
              <Field name="cidade_id">
                {({ field, meta }) => (
                  <div className="relative flex flex-col">
                    <select
                      {...field}
                      id="cidade_id"
                      className={`input border-b p-2 ${meta.touched && meta.error ? "border-red-500" : "border-black"}`}
                    >
                      <option value="">Selecione uma cidade...</option>
                      {cidades.map((cidade) => (
                        <option key={cidade.id} value={cidade.id}>
                          {cidade.cidade} - {cidade.sigla}
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

            <Campos>
              <Label htmlFor="cep">CEP:</Label>
              <Field name="cep">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="cep"
                    maxLength={8}
                    onChange={async (e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      field.onChange({
                        target: { name: field.name, value: onlyDigits },
                      });

                      if (onlyDigits.length === 8) {
                        try {
                          const res = await fetch(
                            `http://localhost:3333/cep/${onlyDigits}`,
                          );
                          if (!res.ok)
                            throw new Error("Erro ao buscar logradouro");
                          const data = await res.json();
                          setLogradouro(data.logradouro || "");
                        } catch (err) {
                          console.error(err);
                          setLogradouro("");
                        }
                      } else {
                        setLogradouro("");
                      }
                    }}
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="logradouro">Logradouro:</Label>
              <Input
                type="text"
                id="logradouro"
                name="logradouro"
                value={logradouro}
                readOnly
              />
            </Campos>

            <Campos>
              <Label htmlFor="numero">Número:</Label>
              <Field name="numero">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="numero"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Campos>
              <Label htmlFor="complemento">Complemento:</Label>
              <Field name="complemento">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="text"
                    id="complemento"
                    error={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Campos>

            <Btn_Add type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Adicionar Usuário"}
            </Btn_Add>
          </AddForm>
        )}
      </Formik>
    </Area>
  );
};

export default AddUsuario;
