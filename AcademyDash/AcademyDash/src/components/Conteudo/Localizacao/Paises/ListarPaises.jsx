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

import { getPaises, deletePais } from "@/services/paises";

const ListarPaises = ({ onSelecionarPais }) => {
  const [filtroPais, setFiltroPais] = useState("");
  const [filtroSigla, setFiltroSigla] = useState("");
  const [filtroContinente, setFiltroContinente] = useState("all");
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarPaises = async () => {
    try {
      const data = await getPaises();
      setPaises(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar países");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPaises();
  }, []);

  const handleExcluir = async (pais) => {
    try {
      await deletePais(pais.id);
      setPaises((prev) => prev.filter((p) => p.id !== pais.id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir país");
    }
  };

  const paisesFiltrados = paises.filter((item) => {
    const matchPais = item.pais
      .toLowerCase()
      .includes(filtroPais.toLowerCase());
    const matchSigla = item.sigla
      .toLowerCase()
      .includes(filtroSigla.toLowerCase());
    const matchContinente =
      filtroContinente === "all" ||
      item.continente.toLowerCase() === filtroContinente.toLowerCase();

    return matchPais && matchSigla && matchContinente;
  });

  return (
    <Area className="listar-turmas-area">
      <FiltrosLista className="grid grid-cols-3 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Filtrar por país"
          value={filtroPais}
          onChange={(e) => setFiltroPais(e.target.value)}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="Filtrar por sigla"
          value={filtroSigla}
          onChange={(e) => setFiltroSigla(e.target.value)}
          className="w-full"
        />
        <Select
          value={filtroContinente}
          onValueChange={(value) => setFiltroContinente(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione continente..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Africa">África</SelectItem>
            <SelectItem value="America do Norte">América do Norte</SelectItem>
            <SelectItem value="America Central">América Central</SelectItem>
            <SelectItem value="America do Sul">América do Sul</SelectItem>
            <SelectItem value="Antartida">Antártida</SelectItem>
            <SelectItem value="Asia">Ásia</SelectItem>
            <SelectItem value="Europa">Europa</SelectItem>
            <SelectItem value="Oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando Países...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>País</TableHead>
                <TableHead>Sigla</TableHead>
                <TableHead>Continente</TableHead>
                <TableHead>DDI</TableHead>
                <TableHead>Moeda</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paisesFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Nenhum país encontrado
                  </TableCell>
                </TableRow>
              ) : (
                paisesFiltrados.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => onSelecionarPais(item)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{item.pais}</TableCell>
                    <TableCell>{item.sigla}</TableCell>
                    <TableCell>{item.continente}</TableCell>
                    <TableCell>{item.ddi}</TableCell>
                    <TableCell>{item.moeda}</TableCell>
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
                              Tem certeza que deseja excluir o país{" "}
                              <strong>{item.pais}</strong>? Esta ação não pode
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

export default ListarPaises;
