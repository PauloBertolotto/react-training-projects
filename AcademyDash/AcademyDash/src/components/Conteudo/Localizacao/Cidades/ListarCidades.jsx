import React, { useEffect, useState } from "react";

import Area from "../../BodyCrud/area";
import DadosAchados from "../../BodyCrud/DadosAchados";
import FiltrosLista from "../../BodyCrud/FiltrosLista";

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

import { getCidades, deleteCidade } from "@/services/cidades";

const ListarCidades = ({ onSelecionarCidade }) => {
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroDDD, setFiltroDDD] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarCidades = async () => {
    try {
      const data = await getCidades();
      setCidades(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar cidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCidades();
  }, []);

  const handleExcluir = async (cidade) => {
    try {
      await deleteCidade(cidade.id);
      setCidades((prev) => prev.filter((c) => c.id !== cidade.id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir cidade");
    }
  };

  const cidadesFiltradas = cidades.filter((item) => {
    const matchCidade = item.cidade
      .toLowerCase()
      .includes(filtroCidade.toLowerCase());

    const matchDDD = item.ddd.toLowerCase().includes(filtroDDD.toLowerCase());

    const matchEstado =
      filtroEstado === "" ||
      (item.estado &&
        item.estado.toLowerCase().includes(filtroEstado.toLowerCase()));

    return matchCidade && matchDDD && matchEstado;
  });

  return (
    <Area className="listar-cidades-area">
      <FiltrosLista className="grid grid-cols-3 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Filtrar por cidade"
          value={filtroCidade}
          onChange={(e) => setFiltroCidade(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />
        <Input
          type="text"
          placeholder="Filtrar por DDD"
          value={filtroDDD}
          onChange={(e) => setFiltroDDD(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />
        <Input
          type="text"
          placeholder="Filtrar por estado"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando Cidades...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cidade</TableHead>
                <TableHead>DDD</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cidadesFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Nenhuma cidade encontrada
                  </TableCell>
                </TableRow>
              ) : (
                cidadesFiltradas.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() =>
                      onSelecionarCidade && onSelecionarCidade(item)
                    }
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{item.cidade}</TableCell>
                    <TableCell>{item.ddd}</TableCell>
                    <TableCell>
                      {item.Estados
                        ? `${item.Estados.estado} (${item.Estados.sigla})`
                        : "—"}
                    </TableCell>
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
                              Tem certeza que deseja excluir a cidade{" "}
                              <strong>{item.cidade}</strong>? Esta ação não pode
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

export default ListarCidades;
