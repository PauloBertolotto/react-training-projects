import React, { useState, useEffect } from "react";
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
      acesso: undefined,
      telefone: "",
    },
    endereco: { cep: "", numero: "", complemento: "", cidade_id: undefined },
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
          cidade_id: usuario.Endereco?.[0]?.cidade_id || undefined,
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
        {/* Campos pessoa */}
        <Campos>
          <Label htmlFor="nome">Nome</Label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={form.pessoa.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome completo"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={form.pessoa.email}
            onChange={handleChange}
            placeholder="Digite o email"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            type="text"
            id="cpf"
            name="cpf"
            value={form.pessoa.cpf}
            onChange={handleChange}
            required
            placeholder="Digite o CPF"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="rg">RG</Label>
          <Input
            type="text"
            id="rg"
            name="rg"
            value={form.pessoa.rg}
            onChange={handleChange}
            placeholder="Digite o RG"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="data_nascimento">Data de Nascimento</Label>
          <Input
            type="date"
            id="data_nascimento"
            name="data_nascimento"
            value={form.pessoa.data_nascimento}
            onChange={handleChange}
            className="w-full text-gray-900 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="genero">Gênero</Label>
          <Input
            type="text"
            id="genero"
            name="genero"
            value={form.pessoa.genero}
            onChange={handleChange}
            placeholder="Digite o gênero"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="acesso">Acesso</Label>
          <Select
            value={form.pessoa.acesso || undefined}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                pessoa: { ...prev.pessoa, acesso: value },
              }))
            }
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
        </Campos>

        <Campos>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            type="text"
            id="telefone"
            name="telefone"
            value={form.pessoa.telefone}
            onChange={handleChange}
            placeholder="Digite o telefone"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        {/* Campos endereço */}
        <Campos>
          <Label htmlFor="cep">CEP</Label>
          <Input
            type="text"
            id="cep"
            name="cep"
            value={form.endereco.cep}
            onChange={handleChange}
            required
            maxLength={9}
            placeholder="Digite o CEP"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input
            type="text"
            id="logradouro"
            name="logradouro"
            value={logradouro}
            readOnly
            className="w-full text-gray-900 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="numero">Número</Label>
          <Input
            type="text"
            id="numero"
            name="numero"
            value={form.endereco.numero}
            onChange={handleChange}
            required
            placeholder="Digite o número"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            type="text"
            id="complemento"
            name="complemento"
            value={form.endereco.complemento}
            onChange={handleChange}
            placeholder="Digite o complemento"
            className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
          />
        </Campos>

        <Campos>
          <Label htmlFor="cidade_id">Cidade</Label>
          <Select
            value={form.endereco.cidade_id || undefined}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                endereco: { ...prev.endereco, cidade_id: value },
              }))
            }
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
        </Campos>

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? "Salvando..." : "Alterar Usuário"}
        </Button>
      </AddForm>
    </Area>
  );
};

export default AlterarUsuario;
