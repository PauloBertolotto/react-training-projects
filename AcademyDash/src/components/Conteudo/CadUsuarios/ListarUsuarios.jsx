import React, { useEffect, useState } from "react";
import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import FiltrosLista from "../BodyCrud/FiltrosLista";
import Btn_Ex from "../BodyCrud/Btn_Ex";
import Table from "../../Core/Table";
import Tr from "../../Core/Tr";
import Th from "../../Core/Th";
import Td from "../../Core/Td";

import { getPessoas, deletePessoa } from "@/services/pessoas";

const ListarUsuarios = ({ onSelecionarUsuario }) => {
  const [filtroGeral, setFiltroGeral] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroAcesso, setFiltroAcesso] = useState("");
  const [filtroCEP, setFiltroCEP] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarUsuarios = async () => {
    try {
      const data = await getPessoas();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleExcluir = async (usuario) => {
    try {
      await deletePessoa(usuario.id);
      setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir usuário");
    }
  };

  const usuariosFiltrados = usuarios.filter((item) => {
    const termo = filtroGeral.toLowerCase();
    const match =
      item.nome?.toLowerCase().includes(termo) ||
      item.cpf?.toLowerCase().includes(termo) ||
      item.email?.toLowerCase().includes(termo) ||
      item.rg?.toLowerCase().includes(termo) ||
      item.telefone?.toLowerCase().includes(termo);
    const matchGenero =
      filtroGenero === "" ||
      (item.genero &&
        item.genero.toLowerCase().includes(filtroGenero.toLowerCase()));
    const matchAcesso =
      filtroAcesso === "" ||
      (item.acesso &&
        item.acesso.toLowerCase().includes(filtroAcesso.toLowerCase()));
    const matchCEP =
      filtroCEP === "" ||
      (item.Endereco?.[0]?.cep &&
        item.Endereco[0].cep.toLowerCase().includes(filtroCEP.toLowerCase()));
    return match && matchGenero && matchAcesso && matchCEP;
  });

  return (
    <Area className="listar-usuarios-area">
      <FiltrosLista>
        <input
          type="text"
          placeholder="Buscar por nome, CPF, email, RG ou telefone"
          value={filtroGeral}
          onChange={(e) => setFiltroGeral(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filtrar por gênero"
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
        />

        <select
          value={filtroAcesso}
          onChange={(e) => setFiltroAcesso(e.target.value)}
        >
          <option value="">Acesso...</option>
          <option value="admin">admin</option>
          <option value="aluno">aluno</option>
          <option value="professor">professor</option>
        </select>

        <input
          type="text"
          placeholder="Filtrar por CEP"
          value={filtroCEP}
          onChange={(e) => setFiltroCEP(e.target.value)}
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando Usuários...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Nome</Th>
                <Th>CPF</Th>
                <Th>Email</Th>
                <Th>RG</Th>
                <Th>Gênero</Th>
                <Th>Acesso</Th>
                <Th>Telefone</Th>
                <Th>Nascimento</Th>
                <Th>CEP</Th>
                <Th>Número</Th>
                <Th>Complemento</Th>
                <Th></Th>
              </Tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <Td colSpan="12">Nenhum usuário encontrado</Td>
                </tr>
              ) : (
                usuariosFiltrados.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      onSelecionarUsuario && onSelecionarUsuario(item)
                    }
                  >
                    <Td>{item.nome}</Td>
                    <Td>{item.cpf}</Td>
                    <Td>{item.email || "—"}</Td>
                    <Td>{item.rg || "—"}</Td>
                    <Td>{item.genero || "—"}</Td>
                    <Td>{item.acesso || "—"}</Td>
                    <Td>{item.telefone || "—"}</Td>
                    <Td>
                      {item.data_nascimento
                        ? new Date(item.data_nascimento).toLocaleDateString(
                            "pt-BR",
                          )
                        : "—"}
                    </Td>
                    <Td>{item.Endereco?.[0]?.cep || "—"}</Td>
                    <Td>{item.Endereco?.[0]?.numero || "—"}</Td>
                    <Td>{item.Endereco?.[0]?.complemento || "—"}</Td>

                    <Td>
                      <Btn_Ex onConfirm={() => handleExcluir(item)} />
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarUsuarios;
