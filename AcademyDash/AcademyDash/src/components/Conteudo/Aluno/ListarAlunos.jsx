import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import FiltrosLista from "../BodyCrud/FiltrosLista";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { getPessoas } from "@/services/pessoas";
import { getTurmasAtivas } from "@/services/turmas";
import {
  getAlunosPorTurma,
  vincularAlunoTurma,
  deleteAluno,
} from "@/services/alunos";

const ListarAlunos = ({ onSelecionarAluno, onVinculoSalvo }) => {
  const [filtroGeral, setFiltroGeral] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [turmasAtivas, setTurmasAtivas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingMap, setSavingMap] = useState({});

  const { user } = useContext(AuthContext);
  const isAdmin = user?.acesso === "admin";

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

  const handleExcluir = async (aluno) => {
    try {
      await deleteAluno(aluno.id);
      setUsuarios((prev) => prev.filter((u) => u.id !== aluno.id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir aluno");
    }
  };

  const handleVincularTurma = async (pessoaId, novaTurmaIdRaw) => {
    const novaTurmaId = novaTurmaIdRaw ? String(novaTurmaIdRaw) : null;

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
      <FiltrosLista className="mb-4">
        <Input
          placeholder="Buscar por nome ou email"
          value={filtroGeral}
          onChange={(e) => setFiltroGeral(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Turma</TableHead>
                {isAdmin && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunosFiltrados.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <Select
                      value={item.turma_id ? String(item.turma_id) : undefined}
                      disabled={!isAdmin || savingMap[item.id]}
                      onValueChange={(value) =>
                        handleVincularTurma(item.id, value)
                      }
                    >
                      <SelectTrigger className="w-full text-gray-900 bg-white">
                        <SelectValue placeholder="Sem turma" />
                      </SelectTrigger>
                      <SelectContent>
                        {turmasAtivas.map((t) => (
                          <SelectItem key={t.id} value={String(t.id)}>
                            {t.nome} — {t.ano} — {t.turno}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Excluir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent
                          onClick={(e) => e.stopPropagation()}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmar exclusão
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o aluno{" "}
                              <strong>{item.nome}</strong>? Esta ação não pode
                              ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={(e) => e.stopPropagation()}
                            >
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExcluir(item);
                              }}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Confirmar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarAlunos;
