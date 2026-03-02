import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Area from "../BodyCrud/area";
import FiltrosLista from "../BodyCrud/FiltrosLista";
import DadosAchados from "../BodyCrud/DadosAchados";

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

const ListarMateriasPorTurma = () => {
  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(undefined);
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const isAdmin = user?.acesso === "admin";

  useEffect(() => {
    const carregarTurmas = async () => {
      try {
        const res = await fetch("http://localhost:3333/turmas?status=Ativo");
        if (!res.ok) throw new Error("Erro ao carregar turmas");
        const data = await res.json();
        setTurmas(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar turmas");
      }
    };
    carregarTurmas();
  }, []);

  useEffect(() => {
    const carregarDisciplinas = async () => {
      if (!turmaSelecionada) return;
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3333/turma-disciplina/turma/${turmaSelecionada}/disciplinas`,
        );
        if (!res.ok) throw new Error("Erro ao carregar disciplinas da turma");
        const data = await res.json();
        setDisciplinas(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar disciplinas da turma");
      } finally {
        setLoading(false);
      }
    };
    carregarDisciplinas();
  }, [turmaSelecionada]);

  const handleExcluirVinculo = async (vinculoId) => {
    try {
      const res = await fetch(
        `http://localhost:3333/turma-disciplina/${vinculoId}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Erro ao excluir vínculo");

      setDisciplinas((prev) => prev.filter((d) => d.vinculoId !== vinculoId));
      alert("Vínculo excluído com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir vínculo");
    }
  };

  return (
    <Area>
      <FiltrosLista className="mb-4">
        <Select
          value={turmaSelecionada || undefined}
          onValueChange={(value) => setTurmaSelecionada(value)}
        >
          <SelectTrigger className="w-full text-gray-900 bg-white">
            <SelectValue placeholder="Selecione uma turma..." />
          </SelectTrigger>
          <SelectContent>
            {turmas.map((t) => (
              <SelectItem key={t.id} value={String(t.id)}>
                {t.nome} — {t.ano} — {t.turno}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando disciplinas...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Disciplina</TableHead>
                <TableHead>Carga Horária</TableHead>
                {isAdmin && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {disciplinas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 3 : 2}
                    className="text-center text-gray-500"
                  >
                    Nenhuma disciplina vinculada
                  </TableCell>
                </TableRow>
              ) : (
                disciplinas.map((d) => (
                  <TableRow key={d.vinculoId}>
                    <TableCell>{d.nome}</TableCell>
                    <TableCell>{d.carga_horaria}</TableCell>
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
                                Tem certeza que deseja excluir o vínculo da
                                disciplina <strong>{d.nome}</strong>? Esta ação
                                não pode ser desfeita.
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
                                  handleExcluirVinculo(d.vinculoId);
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

export default ListarMateriasPorTurma;
