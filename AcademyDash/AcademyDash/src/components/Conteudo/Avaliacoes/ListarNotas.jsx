import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import Filtros from "../BodyCrud/FiltrosLista";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { getTurmas } from "@/services/turmas";
import { getAlunosPorTurma } from "@/services/alunos";
import { getNotasAluno, getNotasTurma } from "@/services/notas";

const ListarNotas = ({ onSelecionarAluno }) => {
  const [turmas, setTurmas] = useState([]);
  const [turmaId, setTurmaId] = useState("all");
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState("all");
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const isAluno = user?.acesso === "aluno";

  useEffect(() => {
    if (isAluno) {
      setTurmaId(user?.turma_id || "all");
      setAlunoId(user?.id ? String(user.id) : "all");
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
    if (!turmaId || turmaId === "all" || isAluno) return;
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
          if (!turmaId || turmaId === "all") {
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
    : alunoId !== "all"
      ? notas.filter((nota) => String(nota.Aluno?.id) === String(alunoId))
      : notas;

  return (
    <Area>
      {!isAluno && (
        <Filtros className="flex gap-4 mb-4">
          <Select
            value={turmaId}
            onValueChange={(value) => {
              setTurmaId(value);
              setAlunoId("all");
            }}
          >
            <SelectTrigger
              id="turmaSelect"
              className="w-full text-gray-900 bg-white"
            >
              <SelectValue placeholder="Escolha uma turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as turmas</SelectItem>
              {turmas.map((turma) => (
                <SelectItem key={turma.id} value={String(turma.id)}>
                  {turma.nome} ({turma.ano} - {turma.turno})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {alunos.length > 0 && (
            <Select
              value={alunoId}
              onValueChange={(value) => setAlunoId(value)}
            >
              <SelectTrigger
                id="alunoSelect"
                className="w-full text-gray-900 bg-white"
              >
                <SelectValue placeholder="Todos os alunos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os alunos</SelectItem>
                {alunos.map((aluno) => (
                  <SelectItem key={aluno.id} value={String(aluno.id)}>
                    {aluno.nome || aluno.Pessoa?.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Filtros>
      )}

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando dados...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Disciplina</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Data Avaliação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notasFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Nenhuma nota encontrada
                  </TableCell>
                </TableRow>
              ) : (
                notasFiltradas.map((nota) => (
                  <TableRow
                    key={nota.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => onSelecionarAluno(nota)}
                  >
                    <TableCell>{nota.Aluno?.Pessoa?.nome || "-"}</TableCell>
                    <TableCell>{nota.Disciplina?.nome}</TableCell>
                    <TableCell>{nota.nota}</TableCell>
                    <TableCell>{nota.frequencia}%</TableCell>
                    <TableCell>
                      {nota.data_avaliacao
                        ? new Date(nota.data_avaliacao).toLocaleDateString(
                            "pt-BR",
                          )
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarNotas;
