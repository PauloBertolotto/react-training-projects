import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import FiltrosLista from "../BodyCrud/FiltrosLista";
import Btn_Ex from "../BodyCrud/Btn_Ex";

import Table from "../../Core/Table";
import Tr from "../../Core/Tr";
import Th from "../../Core/Th";
import Td from "../../Core/Td";

const ListarDisciplinas = ({ onSelecionarDisciplina }) => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCarga, setFiltroCarga] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

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
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta disciplina?",
    );
    if (!confirmar) return;

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
    const statusMatch = filtroStatus === "" || item.status === filtroStatus;

    return nomeMatch && cargaMatch && statusMatch;
  });

  return (
    <Area className="listar-disciplinas">
      <FiltrosLista>
        <input
          type="text"
          placeholder="Nome da disciplina"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Carga horária"
          value={filtroCarga}
          onChange={(e) => setFiltroCarga(e.target.value)}
        />

        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="ativa">Ativa</option>
          <option value="inativa">Inativa</option>
        </select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando disciplinas...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Carga Horária</Th>
                <Th>Status</Th>
                {isAdmin && <Th></Th>}
              </Tr>
            </thead>
            <tbody>
              {disciplinasFiltradas.length === 0 ? (
                <tr>
                  <Td colSpan={isAdmin ? "4" : "3"}>
                    Nenhuma disciplina encontrada
                  </Td>
                </tr>
              ) : (
                disciplinasFiltradas.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      onSelecionarDisciplina && onSelecionarDisciplina(item)
                    }
                  >
                    <Td>{item.nome}</Td>
                    <Td>{item.carga_horaria}</Td>
                    <Td>{item.status}</Td>
                    {isAdmin && (
                      <Td>
                        <Btn_Ex
                          className="btn-excluir"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExcluir(item.id);
                          }}
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

export default ListarDisciplinas;
