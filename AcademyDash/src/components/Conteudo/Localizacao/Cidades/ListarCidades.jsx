import React, { useEffect, useState } from "react";

import Area from "../../BodyCrud/area";
import DadosAchados from "../../BodyCrud/DadosAchados";
import FiltrosLista from "../../BodyCrud/FiltrosLista";
import Btn_Ex from "../../BodyCrud/Btn_Ex";

import Table from "../../../Core/Table";
import Tr from "../../../Core/Tr";
import Th from "../../../Core/Th";
import Td from "../../../Core/Td";

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
      <FiltrosLista>
        <input
          type="text"
          placeholder="Filtrar por cidade"
          value={filtroCidade}
          onChange={(e) => setFiltroCidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por DDD"
          value={filtroDDD}
          onChange={(e) => setFiltroDDD(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por estado"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando Cidades...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Cidade</Th>
                <Th>DDD</Th>
                <Th>Estado</Th>
                <Th></Th>
              </Tr>
            </thead>
            <tbody>
              {cidadesFiltradas.length === 0 ? (
                <tr>
                  <Td colSpan="4">Nenhuma cidade encontrada</Td>
                </tr>
              ) : (
                cidadesFiltradas.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      onSelecionarCidade && onSelecionarCidade(item)
                    }
                  >
                    <Td>{item.cidade}</Td>
                    <Td>{item.ddd}</Td>
                    <Td>
                      {item.Estados
                        ? `${item.Estados.estado} (${item.Estados.sigla})`
                        : "—"}
                    </Td>
                    <Td>
                      {/* Btn_Ex já abre a modal de confirmação internamente */}
                      <Btn_Ex onConfirm={() => handleExcluir(item)} />
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

export default ListarCidades;
