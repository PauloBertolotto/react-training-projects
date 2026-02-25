import React, { useEffect, useState } from "react";

import Area from "../../BodyCrud/area";
import DadosAchados from "../../BodyCrud/DadosAchados";
import FiltrosLista from "../../BodyCrud/FiltrosLista";
import Btn_Ex from "../../BodyCrud/Btn_Ex";

import Table from "../../../Core/Table";
import Tr from "../../../Core/Tr";
import Th from "../../../Core/Th";
import Td from "../../../Core/Td";

const ListarTurmas = ({ onSelecionarTurma }) => {
  const [filtroTurma, setFiltroTurma] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [filtroTurno, setFiltroTurno] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarTurmas = async () => {
    try {
      const response = await fetch("http://localhost:3333/turmas");

      if (!response.ok) {
        throw new Error("Erro ao carregar turmas");
      }

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
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta turma?",
    );

    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3333/turmas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir turma");
      }

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

    const turnoMatch = item.turno
      .toLowerCase()
      .includes(filtroTurno.toLowerCase());

    const statusMatch = filtroStatus === "" || item.status === filtroStatus;

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
      <FiltrosLista>
        <input
          type="text"
          placeholder="Turma"
          value={filtroTurma}
          onChange={(e) => setFiltroTurma(e.target.value)}
        />

        <input
          type="text"
          placeholder="Ano"
          value={filtroAno}
          onChange={(e) => setFiltroAno(e.target.value)}
        />

        <select
          value={filtroTurno}
          onChange={(e) => setFiltroTurno(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
            width: "100%",
          }}
        >
          <option value="">Turno</option>
          <option value="Manhã">Manhã</option>
          <option value="Tarde">Tarde</option>
          <option value="Noite">Noite</option>
        </select>

        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando turmas...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Turma</Th>
                <Th>Ano Letivo</Th>
                <Th>Turno</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </thead>
            <tbody>
              {turmasFiltradas.length === 0 ? (
                <p>Nenhuma turma encontrada</p>
              ) : (
                turmasFiltradas.map((item) => (
                  <tr
                    key={item.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelecionarTurma && onSelecionarTurma(item)}
                  >
                    <Td>{item.nome}</Td>
                    <Td>{item.ano}</Td>
                    <Td>{item.turno}</Td>
                    <Td>
                      <select
                        value={item.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          handleUpdateStatus(item.id, e.target.value)
                        }
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                      </select>
                    </Td>
                    <Td>
                      <Btn_Ex
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExcluir(item.id);
                        }}
                      ></Btn_Ex>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarTurmas;
