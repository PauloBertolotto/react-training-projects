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
      <FiltrosLista className="mb-4">
        <Input
          type="text"
          placeholder="Buscar por nome, email, CPF ou telefone"
          value={filtroGeral}
          onChange={(e) => setFiltroGeral(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando Professores...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Disciplina</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Título</TableHead>
                {isAdmin && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {professoresFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 7 : 6}
                    className="text-center text-gray-500"
                  >
                    Nenhum professor encontrado
                  </TableCell>
                </TableRow>
              ) : (
                professoresFiltrados.map((item) => {
                  const disciplinaVinculo = item.professor_disciplina?.[0];
                  return (
                    <TableRow
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
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <TableCell>{item.Pessoa?.nome}</TableCell>
                      <TableCell>{item.Pessoa?.email || "—"}</TableCell>
                      <TableCell>{item.Pessoa?.telefone || "—"}</TableCell>
                      <TableCell>
                        {disciplinaVinculo?.Disciplina?.nome || "—"}
                      </TableCell>
                      <TableCell>{item.especialidade || "—"}</TableCell>
                      <TableCell>{item.titulo || "—"}</TableCell>
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
                                  Tem certeza que deseja excluir o professor{" "}
                                  <strong>{item.Pessoa?.nome}</strong>? Esta
                                  ação não pode ser desfeita.
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
                                    handleExcluir(item.id);
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
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarProfessores;
