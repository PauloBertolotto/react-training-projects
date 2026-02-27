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

const ListarDisciplinas = ({ onSelecionarDisciplina }) => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCarga, setFiltroCarga] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("all");

  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const isAdmin = user?.acesso === "admin";

  const carregarDisciplinas = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3333/disciplinas");
      if (!response.ok) throw new Error("Erro ao carregar disciplinas");

      const data = await response.json();
      setDisciplinas(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar disciplinas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDisciplinas();
  }, []);

  const handleExcluir = async (id) => {
    try {
      const response = await fetch(`http://localhost:3333/disciplinas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir disciplina");

      setDisciplinas((prev) =>
        prev.filter((disciplina) => disciplina.id !== id),
      );
      alert("Disciplina excluída com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir disciplina");
    }
  };

  const disciplinasFiltradas = disciplinas.filter((item) => {
    const nomeMatch = item.nome
      .toLowerCase()
      .includes(filtroNome.toLowerCase());
    const cargaMatch = filtroCarga
      ? String(item.carga_horaria).includes(filtroCarga)
      : true;
    const statusMatch = filtroStatus === "all" || item.status === filtroStatus;

    return nomeMatch && cargaMatch && statusMatch;
  });

  return (
    <Area className="listar-disciplinas">
      <FiltrosLista className="grid grid-cols-3 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Nome da disciplina"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />

        <Input
          type="text"
          placeholder="Carga horária"
          value={filtroCarga}
          onChange={(e) => setFiltroCarga(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />

        <Select
          value={filtroStatus}
          onValueChange={(value) => setFiltroStatus(value)}
        >
          <SelectTrigger className="w-full text-gray-900 bg-white">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ativa">Ativa</SelectItem>
            <SelectItem value="inativa">Inativa</SelectItem>
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
                <TableHead>Nome</TableHead>
                <TableHead>Carga Horária</TableHead>
                <TableHead>Status</TableHead>
                {isAdmin && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {disciplinasFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 4 : 3}
                    className="text-center text-gray-500"
                  >
                    Nenhuma disciplina encontrada
                  </TableCell>
                </TableRow>
              ) : (
                disciplinasFiltradas.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() =>
                      onSelecionarDisciplina && onSelecionarDisciplina(item)
                    }
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.carga_horaria}</TableCell>
                    <TableCell>{item.status}</TableCell>
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
                                Tem certeza que deseja excluir a disciplina{" "}
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
                ))
              )}
            </TableBody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarDisciplinas;
