import React, { useEffect, useState } from "react";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import FiltrosLista from "../BodyCrud/FiltrosLista";
import Table from "../../Core/Table";
import Tr from "../../Core/Tr";
import Th from "../../Core/Th";
import Td from "../../Core/Td";

import { getTurmasDisciplinas } from "@/services/turmas";
import { getDisciplinasPorTurma } from "@/services/disciplinas";

const DisciplinasPorTurma = ({ turmaId, onSelecionarDisciplina }) => {
  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(turmaId || "");
  const [filtroGeral, setFiltroGeral] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);

  // Carrega turmas
  useEffect(() => {
    getTurmasDisciplinas()
      .then(setTurmas)
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar turmas");
      });
  }, []);

  // Sincroniza turmaId vindo do pai
  useEffect(() => {
    if (turmaId && turmaId !== turmaSelecionada) {
      setTurmaSelecionada(turmaId);
    }
  }, [turmaId]);

  // Carrega disciplinas da turma selecionada
  useEffect(() => {
    const carregarDisciplinas = async () => {
      if (!turmaSelecionada) {
        setDisciplinas([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getDisciplinasPorTurma(turmaSelecionada);

        const normalizadas = (data || []).map((d) => ({
          id: d.id ?? d.disciplina_id ?? null,
          nome: d.nome ?? d.disciplina_nome ?? "",
          carga_horaria: d.carga_horaria ?? "",
          status: d.status ?? "",
        }));

        setDisciplinas(normalizadas);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar disciplinas");
      } finally {
        setLoading(false);
      }
    };

    carregarDisciplinas();
  }, [turmaSelecionada]);

  const disciplinasFiltradas = disciplinas.filter((item) => {
    const termo = filtroGeral.toLowerCase();

    const matchGeral =
      item.nome?.toLowerCase().includes(termo) ||
      String(item.carga_horaria || "").includes(termo);

    const matchStatus =
      filtroStatus === "" ||
      item.status?.toLowerCase().includes(filtroStatus.toLowerCase());

    return matchGeral && matchStatus;
  });

  const handleSelecionarDisciplina = (disciplina) => {
    setDisciplinaAtiva(disciplina.id);
    onSelecionarDisciplina?.({
      id: disciplina.id,
      nome: disciplina.nome,
    });
  };

  return (
    <Area>
      <FiltrosLista>
        <select
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
        >
          <option value="">-- Escolha uma turma ativa --</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por nome ou carga horária"
          value={filtroGeral}
          onChange={(e) => setFiltroGeral(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filtrar por status"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando Disciplinas...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Carga Horária</Th>
                <Th>Status</Th>
              </Tr>
            </thead>
            <tbody>
              {disciplinasFiltradas.length === 0 ? (
                <tr>
                  <Td colSpan="3">Nenhuma disciplina vinculada</Td>
                </tr>
              ) : (
                disciplinasFiltradas.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleSelecionarDisciplina(item)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        disciplinaAtiva === item.id ? "#e0f7fa" : "transparent",
                    }}
                  >
                    <Td>{item.nome}</Td>
                    <Td>{item.carga_horaria}</Td>
                    <Td>{item.status}</Td>
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

export default DisciplinasPorTurma;
