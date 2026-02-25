import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import Filtros from "../BodyCrud/FiltrosLista";

import Table from "../../Core/Table";
import Tr from "../../Core/Tr";
import Th from "../../Core/Th";
import Td from "../../Core/Td";

import { getTurmas } from "@/services/turmas";
import { getAlunosPorTurma } from "@/services/alunos";
import { getNotasAluno, getNotasTurma } from "@/services/notas";

const ListarNotas = ({ onSelecionarAluno }) => {
  const [turmas, setTurmas] = useState([]);
  const [turmaId, setTurmaId] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState("");
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const isAluno = user?.acesso === "aluno";

  useEffect(() => {
    if (isAluno) {
      setTurmaId(user?.turma_id || "");
      setAlunoId(user?.id || "");
    }
  }, [isAluno, user]);

  useEffect(() => {
    if (isAluno) return;
    getTurmas()
      .then(setTurmas)
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar turmas");
      });
  }, [isAluno]);

  useEffect(() => {
    if (!turmaId || isAluno) return;
    getAlunosPorTurma(turmaId)
      .then(setAlunos)
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar alunos");
      });
  }, [turmaId, isAluno]);

  useEffect(() => {
    const carregarNotas = async () => {
      setLoading(true);
      try {
        let data = [];

        if (isAluno) {
          if (!user?.id) {
            setNotas([]);
            return;
          }
          data = await getNotasAluno(user.id);
          const pessoaId = String(user.id);
          const somenteDoAluno = (data || []).filter((nota) => {
            const pessoa = nota?.Aluno?.Pessoa?.id;
            const aluno = nota?.Aluno?.id;
            return (
              (pessoa && String(pessoa) === pessoaId) ||
              (aluno && String(aluno) === String(alunoId))
            );
          });
          setNotas(somenteDoAluno);
        } else {
          if (!turmaId) {
            setNotas([]);
            return;
          }
          data = await getNotasTurma(turmaId);
          setNotas(data || []);
        }
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar notas");
      } finally {
        setLoading(false);
      }
    };

    carregarNotas();
  }, [turmaId, isAluno, user, alunoId]);

  const notasFiltradas = isAluno
    ? notas
    : alunoId
      ? notas.filter((nota) => String(nota.Aluno?.id) === String(alunoId))
      : notas;

  return (
    <Area>
      {!isAluno && (
        <Filtros>
          <select
            id="turmaSelect"
            value={turmaId}
            onChange={(e) => {
              setTurmaId(e.target.value);
              setAlunoId("");
            }}
          >
            <option value="">Escolha uma turma</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome} ({turma.ano} - {turma.turno})
              </option>
            ))}
          </select>
          {!isAluno && alunos.length > 0 && (
            <div>
              <select
                id="alunoSelect"
                value={alunoId}
                onChange={(e) => setAlunoId(e.target.value)}
              >
                <option value="">Todos os alunos</option>
                {alunos.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome || aluno.Pessoa?.nome}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Filtros>
      )}

      <DadosAchados>
        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Aluno</Th>
                <Th>Disciplina</Th>
                <Th>Nota</Th>
                <Th>Frequência</Th>
                <Th>Data Avaliação</Th>
              </Tr>
            </thead>
            <tbody>
              {notasFiltradas.length === 0 ? (
                <tr>
                  <Td colSpan="5">Nenhuma nota encontrada</Td>
                </tr>
              ) : (
                notasFiltradas.map((nota) => (
                  <tr
                    key={nota.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelecionarAluno(nota)}
                  >
                    <Td>{nota.Aluno?.Pessoa?.nome || "-"}</Td>
                    <Td>{nota.Disciplina?.nome}</Td>
                    <Td>{nota.nota}</Td>
                    <Td>{nota.frequencia}%</Td>
                    <Td>
                      {nota.data_avaliacao
                        ? new Date(nota.data_avaliacao).toLocaleDateString(
                            "pt-BR",
                          )
                        : "-"}
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

export default ListarNotas;
