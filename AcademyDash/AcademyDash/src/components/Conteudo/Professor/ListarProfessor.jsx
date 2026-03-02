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
} from "@/services/professores";
import { getPessoas } from "@/services/pessoas";

const ListarProfessores = ({ onSelecionarProfessor }) => {
  const [filtroGeral, setFiltroGeral] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const isAdmin = user?.acesso === "admin";

  const carregarUsuarios = async () => {
    try {
      setLoading(true);

      const [pessoasData, professoresData] = await Promise.all([
        getPessoas(),
        getProfessoresComDisciplina(),
      ]);

      const pessoasProfessores = pessoasData.filter(
        (p) => p.acesso === "professor",
      );

      const professoresComDados = pessoasProfessores.map((p) => {
        const vinculo = (professoresData || []).find(
          (v) => Number(v.id) === Number(p.id),
        );
        const disciplinaVinculo =
          vinculo?.professor_disciplina?.[0] ??
          vinculo?.ProfessorDisciplina?.[0] ??
          null;
        const disciplinaNome =
          disciplinaVinculo?.Disciplina?.nome ??
          disciplinaVinculo?.disciplina_nome ??
          disciplinaVinculo?.nome ??
          null;
        const disciplinaId =
          disciplinaVinculo?.disciplina_id ??
          disciplinaVinculo?.disciplinaId ??
          disciplinaVinculo?.id ??
          null;

        return {
          ...p,
          professor_id: vinculo?.id ?? null,
          especialidade: vinculo?.especialidade ?? "",
          titulo: vinculo?.titulo ?? "",
          disciplina_id: disciplinaId,
          disciplina_nome: disciplinaNome,
        };
      });

      setUsuarios(professoresComDados);
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
      setUsuarios((prev) => prev.filter((u) => u.professor_id !== id));
      alert("Professor excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir professor");
    }
  };

  const professoresFiltrados = usuarios.filter((item) => {
    const termo = filtroGeral.toLowerCase();
    return (
      item.nome?.toLowerCase().includes(termo) ||
      item.email?.toLowerCase().includes(termo) ||
      item.cpf?.toLowerCase().includes(termo) ||
      item.telefone?.toLowerCase().includes(termo)
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
                {isAdmin && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {professoresFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 4 : 3}
                    className="text-center text-gray-500"
                  >
                    Nenhum professor encontrado
                  </TableCell>
                </TableRow>
              ) : (
                professoresFiltrados.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() =>
                      onSelecionarProfessor({
                        pessoa_id: item.id,
                        pessoa_nome: item.nome,
                        pessoa_email: item.email,
                        pessoa_cpf: item.cpf,
                        especialidade: item.especialidade,
                        titulo: item.titulo,
                        disciplina_id: item.disciplina_id,
                        disciplina_nome: item.disciplina_nome,
                        professor_id: item.professor_id,
                      })
                    }
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.email || "—"}</TableCell>
                    <TableCell>{item.telefone || "—"}</TableCell>
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
                                  handleExcluir(item.professor_id);
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
                ))
              )}
            </TableBody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarProfessores;
