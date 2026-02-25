import React, { useEffect, useState } from "react";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import FiltrosLista from "../BodyCrud/FiltrosLista";
import Btn_Ex from "../BodyCrud/Btn_Ex";

import Table from "../../Core/Table";
import Tr from "../../Core/Tr";
import Th from "../../Core/Th";
import Td from "../../Core/Td";

import { getTurmasDisciplinas } from "@/services/turmas";
import { getAlunos, getAlunosPorTurma, deleteAluno } from "@/services/alunos";

const ListarAlunoPorTurma = ({ turmaId, onSelecionarAluno }) => {
  const [filtroGeral, setFiltroGeral] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [alunoAtivo, setAlunoAtivo] = useState(null);

  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(turmaId || "");

  useEffect(() => {
    getTurmasDisciplinas()
      .then(setTurmas)
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar turmas");
      });
  }, []);

  useEffect(() => {
    if (turmaId && turmaId !== turmaSelecionada) {
      setTurmaSelecionada(turmaId);
    }
  }, [turmaId]);

  const carregarAlunos = async () => {
    try {
      const data = turmaSelecionada
        ? await getAlunosPorTurma(turmaSelecionada)
        : await getAlunos();
      setAlunos(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar alunos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, [turmaSelecionada]);

  const handleExcluir = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja desvincular este aluno da turma?",
    );
    if (!confirmar) return;

    try {
      await deleteAluno(id);
      setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir aluno");
    }
  };

  const alunosFiltrados = alunos.filter((item) => {
    const termo = filtroGeral.toLowerCase();

    const matchGeral =
      item.nome?.toLowerCase().includes(termo) ||
      item.email?.toLowerCase().includes(termo) ||
      item.Pessoa?.nome?.toLowerCase().includes(termo) ||
      item.Pessoa?.email?.toLowerCase().includes(termo);

    const matchAno =
      filtroAno === "" ||
      ((item.turma_ano || item.Turma?.ano) &&
        String(item.turma_ano || item.Turma?.ano).includes(filtroAno));

    const matchTurma =
      turmaSelecionada === "" ||
      String(item.turma_id || item.Turma?.id) === String(turmaSelecionada);

    return matchGeral && matchAno && matchTurma;
  });

  return (
    <Area className="alunos-por-turma-area">
      <FiltrosLista>
        <select
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
        >
          <option value="">Escolha uma turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por nome ou email"
          value={filtroGeral}
          onChange={(e) => setFiltroGeral(e.target.value)}
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando Alunos...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Matrícula</Th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Turma</Th>
                <Th>Turno</Th>
                <Th></Th>
              </Tr>
            </thead>
            <tbody>
              {alunosFiltrados.length === 0 ? (
                <tr>
                  <Td colSpan="7">Nenhum aluno encontrado</Td>
                </tr>
              ) : (
                alunosFiltrados.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      setAlunoAtivo(item.id);
                      if (onSelecionarAluno) {
                        onSelecionarAluno({
                          id: item.id,
                          nome: item.nome || item.Pessoa?.nome || "",
                          email: item.email || item.Pessoa?.email || "",
                          turma: item.turma_nome || item.Turma?.nome || "",
                          turno: item.turma_turno || item.Turma?.turno || "",
                          status: item.status || "",
                          matricula: item.matricula || "",
                        });
                      }
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        alunoAtivo === item.id ? "#e0f7fa" : "transparent",
                    }}
                  >
                    <Td>{item.matricula}</Td>
                    <Td>{item.nome || item.Pessoa?.nome}</Td>
                    <Td>{item.email || item.Pessoa?.email || "—"}</Td>
                    <Td>{item.turma_nome || item.Turma?.nome}</Td>
                    <Td>{item.turma_turno || item.Turma?.turno}</Td>
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

export default ListarAlunoPorTurma;
