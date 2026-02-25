import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import FiltrosLista from "../BodyCrud/FiltrosLista";
import Btn_Ex from "../BodyCrud/Btn_Ex";

import Table from "../../Core/Table";
import Tr from "../../Core/Tr";
import Th from "../../Core/Th";
import Td from "../../Core/Td";

import {
  getProfessoresComDisciplina,
  deleteProfessor,
  atualizarProfessor,
  atualizarProfessorDisciplina,
} from "@/services/professores";
import { getDisciplinas } from "@/services/disciplinas";

const ListarProfessores = ({ onSelecionarProfessor }) => {
  const [filtroGeral, setFiltroGeral] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingMap, setSavingMap] = useState({});

  const { user } = useContext(AuthContext);
  const isAdmin = user?.acesso === "admin";

  const carregarUsuarios = async () => {
    try {
      const [professoresData, disciplinasData] = await Promise.all([
        getProfessoresComDisciplina(),
        getDisciplinas(),
      ]);

      setUsuarios(professoresData);
      setDisciplinas(disciplinasData);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleExcluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este professor?"))
      return;
    try {
      await deleteProfessor(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("Professor excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir professor");
    }
  };

  const handleUpdate = async (professorId, updates) => {
    if (!isAdmin) return;
    setSavingMap((m) => ({ ...m, [professorId]: true }));
    try {
      if (updates.disciplina_id !== undefined) {
        await atualizarProfessorDisciplina(professorId, updates);
      } else {
        await atualizarProfessor(professorId, updates);
      }
      await carregarUsuarios();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSavingMap((m) => ({ ...m, [professorId]: false }));
    }
  };

  const professoresFiltrados = usuarios.filter((item) => {
    const termo = filtroGeral.toLowerCase();
    return (
      item.Pessoa?.nome?.toLowerCase().includes(termo) ||
      item.Pessoa?.email?.toLowerCase().includes(termo) ||
      item.Pessoa?.cpf?.toLowerCase().includes(termo) ||
      item.Pessoa?.telefone?.toLowerCase().includes(termo)
    );
  });

  return (
    <Area className="listar-professores-area">
      <FiltrosLista>
        <input
          type="text"
          placeholder="Buscar"
          value={filtroGeral}
          onChange={(e) => setFiltroGeral(e.target.value)}
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando Professores...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Disciplina</Th>
                <Th>Especialidade</Th>
                <Th>Título</Th>
                {isAdmin && <Th>Ações</Th>}
              </Tr>
            </thead>
            <tbody>
              {professoresFiltrados.length === 0 ? (
                <tr>
                  <Td colSpan={isAdmin ? "7" : "6"}>
                    Nenhum professor encontrado
                  </Td>
                </tr>
              ) : (
                professoresFiltrados.map((item) => {
                  const disciplinaVinculo = item.professor_disciplina?.[0];
                  return (
                    <tr
                      key={item.id}
                      onClick={() =>
                        onSelecionarProfessor({
                          ...item,
                          pessoa_nome: item.Pessoa?.nome,
                          pessoa_email: item.Pessoa?.email,
                          pessoa_cpf: item.Pessoa?.cpf,
                          especialidade: item.especialidade,
                          titulo: item.titulo,
                          disciplina_id: disciplinaVinculo?.disciplina_id,
                          disciplina_nome: disciplinaVinculo?.Disciplina?.nome,
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Td>{item.Pessoa?.nome}</Td>
                      <Td>{item.Pessoa?.email || "—"}</Td>
                      <Td>{item.Pessoa?.telefone || "—"}</Td>
                      <Td>{disciplinaVinculo?.Disciplina?.nome || "—"}</Td>
                      <Td>{item.especialidade || ""}</Td>
                      <Td>{item.titulo || ""}</Td>
                      {isAdmin && (
                        <Td>
                          <Btn_Ex
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExcluir(item.id);
                            }}
                          >
                            Excluir
                          </Btn_Ex>
                        </Td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarProfessores;
