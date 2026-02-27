import React, { useEffect, useState } from "react";

import Area from "../../BodyCrud/area";
import DadosAchados from "../../BodyCrud/DadosAchados";
import FiltrosLista from "../../BodyCrud/FiltrosLista";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const ListarTurmas = ({ onSelecionarTurma }) => {
  const [filtroTurma, setFiltroTurma] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [filtroTurno, setFiltroTurno] = useState("all");
  const [filtroStatus, setFiltroStatus] = useState("all");

  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarTurmas = async () => {
    try {
      const response = await fetch("http://localhost:3333/turmas");
      if (!response.ok) throw new Error("Erro ao carregar turmas");
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar turmas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTurmas();
  }, []);

  const handleExcluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta turma?")) return;
    try {
      const response = await fetch(`http://localhost:3333/turmas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir turma");
      setTurmas((prev) => prev.filter((turma) => turma.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir turma");
    }
  };

  const turmasFiltradas = turmas.filter((item) => {
    const turmaMatch = item.nome
      .toLowerCase()
      .includes(filtroTurma.toLowerCase());
    const anoMatch = filtroAno ? String(item.ano).includes(filtroAno) : true;
    const turnoMatch = filtroTurno === "all" || item.turno === filtroTurno;
    const statusMatch = filtroStatus === "all" || item.status === filtroStatus;
    return turmaMatch && anoMatch && turnoMatch && statusMatch;
  });

  const handleUpdateStatus = async (turmaId, novoStatus) => {
    try {
      const res = await fetch(`http://localhost:3333/turmas/${turmaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar status da turma");
      setTurmas((prev) =>
        prev.map((t) => (t.id === turmaId ? { ...t, status: novoStatus } : t)),
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Area className="listar-turmas">
      <FiltrosLista className="grid grid-cols-4 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Turma"
          value={filtroTurma}
          onChange={(e) => setFiltroTurma(e.target.value)}
          className="w-full text-gray-900 bg-white placeholder:text-gray-400"
        />

        <Input
          type="text"
          placeholder="Ano"
          value={filtroAno}
          onChange={(e) => setFiltroAno(e.target.value)}
          className="w-full text-gray-900 bg-white placeholder:text-gray-400"
        />

        <Select value={filtroTurno} onValueChange={setFiltroTurno}>
          <SelectTrigger className="w-full text-gray-900 bg-white">
            <SelectValue placeholder="Turno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Manhã">Manhã</SelectItem>
            <SelectItem value="Tarde">Tarde</SelectItem>
            <SelectItem value="Noite">Noite</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-full text-gray-900 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando turmas...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Turma</TableHead>
                <TableHead>Ano Letivo</TableHead>
                <TableHead>Turno</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {turmasFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Nenhuma turma encontrada
                  </TableCell>
                </TableRow>
              ) : (
                turmasFiltradas.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => onSelecionarTurma && onSelecionarTurma(item)}
                  >
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.ano}</TableCell>
                    <TableCell>{item.turno}</TableCell>
                    <TableCell>
                      <Select
                        value={item.status}
                        onValueChange={(value) =>
                          handleUpdateStatus(item.id, value)
                        }
                      >
                        <SelectTrigger className="w-full text-gray-900 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExcluir(item.id);
                        }}
                      >
                        Excluir
                      </Button>
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

export default ListarTurmas;
