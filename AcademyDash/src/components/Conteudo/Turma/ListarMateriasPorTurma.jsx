import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext"; // atenção: mais um "../"

import Area from "../BodyCrud/area";
import FiltrosLista from "../BodyCrud/FiltrosLista";
import DadosAchados from "../BodyCrud/DadosAchados";

import Table from "../../Core/Table";
import Tr from "../../Core/Tr";
import Th from "../../Core/Th";
import Td from "../../Core/Td";
import Btn_Ex from "../BodyCrud/Btn_Ex"; // botão de excluir

const ListarMateriasPorTurma = () => {
  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const isAdmin = user?.acesso === "admin";

  // Carregar turmas ativas
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

  // Carregar disciplinas vinculadas à turma selecionada
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

  // Excluir vínculo
  const handleExcluirVinculo = async (vinculoId) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este vínculo?",
    );
    if (!confirmar) return;

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
      <FiltrosLista>
        <select
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
        >
          <option value="">Selecione uma turma...</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome} — {t.ano} — {t.turno}
            </option>
          ))}
        </select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando disciplinas...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Disciplina</Th>
                <Th>Carga Horária</Th>
                {isAdmin && <Th>Ações</Th>}
              </Tr>
            </thead>
            <tbody>
              {disciplinas.length === 0 ? (
                <tr>
                  <Td colSpan={isAdmin ? "3" : "2"}>
                    Nenhuma disciplina vinculada
                  </Td>
                </tr>
              ) : (
                disciplinas.map((d) => (
                  <tr key={d.vinculoId}>
                    <Td>{d.nome}</Td>
                    <Td>{d.carga_horaria}</Td>
                    {isAdmin && (
                      <Td>
                        <Btn_Ex
                          onClick={() => handleExcluirVinculo(d.vinculoId)}
                          className="btn-excluir"
                        />
                      </Td>
                    )}
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

export default ListarMateriasPorTurma;
