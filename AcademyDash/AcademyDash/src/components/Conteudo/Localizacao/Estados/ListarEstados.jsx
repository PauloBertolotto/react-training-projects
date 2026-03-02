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

import { getEstados, deleteEstado } from "@/services/estados";

const ListarEstados = ({ onSelecionarEstado }) => {
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroSigla, setFiltroSigla] = useState("");
  const [filtroPais, setFiltroPais] = useState("");

  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarEstados = async () => {
    try {
      const data = await getEstados();
      setEstados(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar estados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEstados();
  }, []);

  const handleExcluir = async (estado) => {
    try {
      await deleteEstado(estado.id);
      setEstados((prev) => prev.filter((e) => e.id !== estado.id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir estado");
    }
  };

  const estadosFiltrados = estados.filter((item) => {
    const matchEstado = item.estado
      .toLowerCase()
      .includes(filtroEstado.toLowerCase());
    const matchSigla = item.sigla
      .toLowerCase()
      .includes(filtroSigla.toLowerCase());
    const matchPais =
      filtroPais === "" ||
      (item.pais && item.pais.toLowerCase().includes(filtroPais.toLowerCase()));

    return matchEstado && matchSigla && matchPais;
  });

  return (
    <Area className="listar-turmas-area">
      <FiltrosLista className="grid grid-cols-3 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Filtrar por estado"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />
        <Input
          type="text"
          placeholder="Filtrar por sigla"
          value={filtroSigla}
          onChange={(e) => setFiltroSigla(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />
        <Input
          type="text"
          placeholder="Filtrar por país"
          value={filtroPais}
          onChange={(e) => setFiltroPais(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando Estados...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estado</TableHead>
                <TableHead>Sigla</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estadosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Nenhum estado encontrado
                  </TableCell>
                </TableRow>
              ) : (
                estadosFiltrados.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() =>
                      onSelecionarEstado && onSelecionarEstado(item)
                    }
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{item.estado}</TableCell>
                    <TableCell>{item.sigla}</TableCell>
                    <TableCell>
                      {item.Paises ? item.Paises.pais : "—"}
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
                              Tem certeza que deseja excluir o estado{" "}
                              <strong>{item.estado}</strong>? Esta ação não pode
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

export default ListarEstados;
