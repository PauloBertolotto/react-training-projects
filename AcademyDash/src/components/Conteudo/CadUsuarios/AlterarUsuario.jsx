import React, { useState, useEffect } from "react";
import Area from "../BodyCrud/area";
import AddForm from "../BodyCrud/AddForm";
import Campos from "../BodyCrud/Campos";
import Btn_Alt from "../BodyCrud/Btn_Alt";
import Label from "../../Core/Label";
import Input from "../../Core/Input";
import { getCidades } from "@/services/cidades";
import { getLogradouroPorCep } from "@/services/cep";
import { atualizarPessoaComEndereco } from "@/services/pessoas";
const AlterarUsuario = ({ usuario, onVoltar }) => {
  const [logradouro, setLogradouro] = useState("");
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    pessoa: {
      nome: "",
      email: "",
      cpf: "",
      rg: "",
      data_nascimento: "",
      genero: "",
      acesso: "",
      telefone: "",
    },
    endereco: { cep: "", numero: "", complemento: "", cidade_id: "" },
  });
  useEffect(() => {
    if (usuario) {
      setForm({
        pessoa: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cpf: usuario.cpf,
          rg: usuario.rg,
          data_nascimento: usuario.data_nascimento,
          genero: usuario.genero,
          acesso: usuario.acesso,
          telefone: usuario.telefone,
        },
        endereco: {
          cep: usuario.Endereco?.[0]?.cep || "",
          numero: usuario.Endereco?.[0]?.numero || "",
          complemento: usuario.Endereco?.[0]?.complemento || "",
          cidade_id: usuario.Endereco?.[0]?.cidade_id || "",
        },
      });
    }
  }, [usuario]);
  useEffect(() => {
    const cep = form.endereco.cep.replace(/\D/g, "");
    if (cep.length < 8) {
      setLogradouro("");
      return;
    }
    getLogradouroPorCep(cep)
      .then((data) => setLogradouro(data.logradouro || ""))
      .catch(() => setLogradouro(""));
  }, [form.endereco.cep]);
  useEffect(() => {
    getCidades()
      .then(setCidades)
      .catch((err) => {
        console.error("Erro ao carregar cidades:", err);
        alert("Erro ao carregar cidades");
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.pessoa) {
      setForm((prev) => ({
        ...prev,
        pessoa: { ...prev.pessoa, [name]: value },
      }));
    } else if (name in form.endereco) {
      setForm((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [name]: name === "cep" ? value.replace(/\D/g, "") : value,
        },
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario || !usuario.id) {
      alert("Nenhum usuário selecionado para alteração.");
      return;
    }
    setLoading(true);
    try {
      await atualizarPessoaComEndereco(usuario.id, form);
      alert("Usuário alterado com sucesso!");
      if (onVoltar) onVoltar();
    } catch (error) {
      console.error("Erro ao alterar usuário:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Area>
      <AddForm onSubmit={handleSubmit}>
        <h3>Alterar Usuário</h3>

        <Campos>
          <Label htmlFor="nome">Nome:</Label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={form.pessoa.nome}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={form.pessoa.email}
            onChange={handleChange}
          />
        </Campos>

        <Campos>
          <Label htmlFor="cpf">CPF:</Label>
          <Input
            type="text"
            id="cpf"
            name="cpf"
            value={form.pessoa.cpf}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="rg">RG:</Label>
          <Input
            type="text"
            id="rg"
            name="rg"
            value={form.pessoa.rg}
            onChange={handleChange}
          />
        </Campos>

        <Campos>
          <Label htmlFor="data_nascimento">Data de Nascimento:</Label>
          <Input
            type="date"
            id="data_nascimento"
            name="data_nascimento"
            value={form.pessoa.data_nascimento}
            onChange={handleChange}
          />
        </Campos>

        <Campos>
          <Label htmlFor="genero">Gênero:</Label>
          <Input
            type="text"
            id="genero"
            name="genero"
            value={form.pessoa.genero}
            onChange={handleChange}
          />
        </Campos>

        <Campos>
          <Label htmlFor="acesso">Acesso:</Label>
          <select
            id="acesso"
            name="acesso"
            value={form.pessoa.acesso}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="admin">admin</option>
            <option value="aluno">aluno</option>
            <option value="professor">professor</option>
          </select>
        </Campos>

        <Campos>
          <Label htmlFor="telefone">Telefone:</Label>
          <Input
            type="text"
            id="telefone"
            name="telefone"
            value={form.pessoa.telefone}
            onChange={handleChange}
          />
        </Campos>

        <Campos>
          <Label htmlFor="cep">CEP:</Label>
          <Input
            type="text"
            id="cep"
            name="cep"
            value={form.endereco.cep}
            onChange={handleChange}
            required
            maxLength={9}
          />
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
          <Input
            type="text"
            id="numero"
            name="numero"
            value={form.endereco.numero}
            onChange={handleChange}
            required
          />
        </Campos>

        <Campos>
          <Label htmlFor="complemento">Complemento:</Label>
          <Input
            type="text"
            id="complemento"
            name="complemento"
            value={form.endereco.complemento}
            onChange={handleChange}
          />
        </Campos>

        <Campos>
          <Label htmlFor="cidade_id">Cidade:</Label>
          <select
            id="cidade_id"
            name="cidade_id"
            value={form.endereco.cidade_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma cidade...</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.cidade} - {cidade.sigla}
              </option>
            ))}
          </select>
        </Campos>

        <Btn_Alt type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Alterar Usuário"}
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
    </Area>
  );
};

export default AlterarUsuario;
