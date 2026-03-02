import React, { useEffect, useState } from "react";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import FiltrosLista from "../BodyCrud/FiltrosLista";
import Btn_Ex from "../BodyCrud/Btn_Ex";

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

import { getTurmasDisciplinas } from "@/services/turmas";
import { getAlunos, getAlunosPorTurma, deleteAluno } from "@/services/alunos";

const ListarAlunoPorTurma = ({ turmaId, onSelecionarAluno }) => {
  const [filtroNome, setFiltroNome] = useState("all");
  const [filtroAno, setFiltroAno] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [alunoAtivo, setAlunoAtivo] = useState(null);

  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(turmaId || "all");

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
      const data =
        turmaSelecionada && turmaSelecionada !== "all"
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
    const matchNome =
      filtroNome === "all" || (item.nome || item.Pessoa?.nome) === filtroNome;

    const matchAno =
      filtroAno === "" ||
      ((item.turma_ano || item.Turma?.ano) &&
        String(item.turma_ano || item.Turma?.ano).includes(filtroAno));

    const matchTurma =
      turmaSelecionada === "all" ||
      String(item.turma_id || item.Turma?.id) === String(turmaSelecionada);

    return matchNome && matchAno && matchTurma;
  });

  return (
    <Area className="alunos-por-turma-area">
      <FiltrosLista className="flex gap-4 mb-4">
        <Select
          value={turmaSelecionada}
          onValueChange={(value) => setTurmaSelecionada(value)}
        >
          <SelectTrigger className="w-full text-gray-900 bg-white">
            <SelectValue placeholder="Escolha uma turma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as turmas</SelectItem>
            {turmas.map((turma) => (
              <SelectItem key={turma.id} value={String(turma.id)}>
                {turma.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filtroNome}
          onValueChange={(value) => setFiltroNome(value)}
        >
          <SelectTrigger className="w-full text-gray-900 bg-white">
            <SelectValue placeholder="Filtrar por aluno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os alunos</SelectItem>
            {alunos.map((aluno) => (
              <SelectItem
                key={aluno.id}
                value={aluno.nome || aluno.Pessoa?.nome || ""}
              >
                {aluno.nome || aluno.Pessoa?.nome || "—"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando Alunos...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matrícula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead>Turno</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Nenhum aluno encontrado
                  </TableCell>
                </TableRow>
              ) : (
                alunosFiltrados.map((item) => (
                  <TableRow
                    key={item.id}
                    className={`cursor-pointer ${
                      alunoAtivo === item.id ? "bg-cyan-100" : ""
                    }`}
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
                  >
                    <TableCell>{item.matricula}</TableCell>
                    <TableCell>{item.nome || item.Pessoa?.nome}</TableCell>
                    <TableCell>
                      {item.email || item.Pessoa?.email || "—"}
                    </TableCell>
                    <TableCell>{item.turma_nome || item.Turma?.nome}</TableCell>
                    <TableCell>
                      {item.turma_turno || item.Turma?.turno}
                    </TableCell>
                    <TableCell>
                      <Btn_Ex
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExcluir(item.id);
                        }}
                      >
                        Excluir
                      </Btn_Ex>
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

export default ListarAlunoPorTurma;
