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
import Modal from "../../Core/Modal"; // importa o modal

import { getPessoas } from "@/services/pessoas";
import { getTurmasAtivas } from "@/services/turmas";
import { getAlunosPorTurma, vincularAlunoTurma } from "@/services/alunos";

const ListarAlunos = ({ onSelecionarAluno, onVinculoSalvo }) => {
  const [filtroGeral, setFiltroGeral] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [turmasAtivas, setTurmasAtivas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingMap, setSavingMap] = useState({});

  const { user } = useContext(AuthContext);
  const isAdmin = user?.acesso === "admin";

  // controle da modal de exclusão de vínculo
  const [modalExcluirVinculo, setModalExcluirVinculo] = useState(false);
  const [alunoParaRemoverTurma, setAlunoParaRemoverTurma] = useState(null);

  const carregarDados = async () => {
    try {
      setLoading(true);

      const [pessoasData, turmasData] = await Promise.all([
        getPessoas(),
        getTurmasAtivas(),
      ]);

      const mapaPessoaTurma = {};

      for (const turma of turmasData) {
        try {
          const alunos = await getAlunosPorTurma(turma.id);
          alunos.forEach((a) => {
            mapaPessoaTurma[String(a.id)] = {
              turma_id: turma.id,
              turma_nome: turma.nome,
              turma_turno: turma.turno,
              turma_ano: turma.ano,
            };
          });
        } catch {
          continue;
        }
      }

      const pessoasComTurma = pessoasData.map((p) => ({
        ...p,
        ...(mapaPessoaTurma[String(p.id)] || {
          turma_id: null,
          turma_nome: null,
          turma_turno: null,
          turma_ano: null,
        }),
      }));

      setUsuarios(pessoasComTurma);
      setTurmasAtivas(turmasData);
    } catch (e) {
      console.error(e);
      alert("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const confirmarRemoverTurma = async () => {
    if (!alunoParaRemoverTurma) return;

    setSavingMap((m) => ({ ...m, [alunoParaRemoverTurma.id]: true }));

    try {
      const { aluno } = await vincularAlunoTurma(
        alunoParaRemoverTurma.id,
        null,
      );

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === alunoParaRemoverTurma.id
            ? {
                ...u,
                turma_id: null,
                turma_nome: null,
                turma_turno: null,
                turma_ano: null,
              }
            : u,
        ),
      );

      onVinculoSalvo?.(alunoParaRemoverTurma.id, null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Erro ao remover vínculo");
    } finally {
      setSavingMap((m) => ({ ...m, [alunoParaRemoverTurma.id]: false }));
      setAlunoParaRemoverTurma(null);
      setModalExcluirVinculo(false);
    }
  };

  const handleVincularTurma = async (pessoaId, novaTurmaIdRaw) => {
    const novaTurmaId = novaTurmaIdRaw ? String(novaTurmaIdRaw) : null;

    if (!novaTurmaId) {
      // abre modal de confirmação ao remover turma
      const aluno = usuarios.find((u) => u.id === pessoaId);
      setAlunoParaRemoverTurma(aluno);
      setModalExcluirVinculo(true);
      return;
    }

    setSavingMap((m) => ({ ...m, [pessoaId]: true }));

    try {
      const { aluno, turma } = await vincularAlunoTurma(pessoaId, novaTurmaId);

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === pessoaId
            ? {
                ...u,
                turma_id: aluno?.turma_id ?? null,
                turma_nome: turma?.nome ?? null,
                turma_turno: turma?.turno ?? null,
                turma_ano: turma?.ano ?? null,
              }
            : u,
        ),
      );

      onVinculoSalvo?.(pessoaId, novaTurmaId);
    } catch (err) {
      console.error(err);
      alert(err.message || "Erro ao salvar vínculo");
    } finally {
      setSavingMap((m) => ({ ...m, [pessoaId]: false }));
    }
  };

  const alunosFiltrados = usuarios.filter(
    (u) =>
      u.acesso === "aluno" &&
      (u.nome?.toLowerCase().includes(filtroGeral.toLowerCase()) ||
        u.email?.toLowerCase().includes(filtroGeral.toLowerCase())),
  );

  return (
    <Area>
      <FiltrosLista>
        <input
          placeholder="Buscar"
          value={filtroGeral}
          onChange={(e) => setFiltroGeral(e.target.value)}
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Turma</Th>
                {isAdmin && <Th></Th>}
              </Tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((item) => (
                <tr key={item.id}>
                  <Td>{item.nome}</Td>
                  <Td>{item.email}</Td>
                  <Td>
                    <select
                      value={item.turma_id ? String(item.turma_id) : ""}
                      disabled={!isAdmin || savingMap[item.id]}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        handleVincularTurma(item.id, e.target.value)
                      }
                    >
                      <option value="">Sem turma</option>
                      {turmasAtivas.map((t) => (
                        <option key={t.id} value={String(t.id)}>
                          {t.nome} — {t.ano} — {t.turno}
                        </option>
                      ))}
                    </select>
                  </Td>
                  {isAdmin && (
                    <Td>
                      <Btn_Ex
                        onClick={() => {
                          alert("Excluir aluno ainda não implementado");
                        }}
                      />
                    </Td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </DadosAchados>

      {/* Modal de confirmação para remover vínculo de turma */}
      <Modal
        isOpen={modalExcluirVinculo}
        onClose={() => setModalExcluirVinculo(false)}
        title="Remover vínculo de turma"
      >
        <p className="mb-4">
          Deseja realmente remover a turma do aluno{" "}
          <strong>{alunoParaRemoverTurma?.nome}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setModalExcluirVinculo(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={confirmarRemoverTurma}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Remover
          </button>
        </div>
      </Modal>
    </Area>
  );
};

export default ListarAlunos;
