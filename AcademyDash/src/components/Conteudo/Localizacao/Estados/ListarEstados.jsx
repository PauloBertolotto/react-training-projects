import React, { useEffect, useState } from "react";

import Area from "../../BodyCrud/area";
import DadosAchados from "../../BodyCrud/DadosAchados";
import FiltrosLista from "../../BodyCrud/FiltrosLista";
import Btn_Ex from "../../BodyCrud/Btn_Ex";

import Table from "../../../Core/Table";
import Tr from "../../../Core/Tr";
import Th from "../../../Core/Th";
import Td from "../../../Core/Td";

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
      <FiltrosLista>
        <input
          type="text"
          placeholder="Filtrar por estado"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por sigla"
          value={filtroSigla}
          onChange={(e) => setFiltroSigla(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por país"
          value={filtroPais}
          onChange={(e) => setFiltroPais(e.target.value)}
        />
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando Estados...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Estado</Th>
                <Th>Sigla</Th>
                <Th>País</Th>
                <Th></Th>
              </Tr>
            </thead>
            <tbody>
              {estadosFiltrados.length === 0 ? (
                <tr>
                  <Td colSpan="4">Nenhum estado encontrado</Td>
                </tr>
              ) : (
                estadosFiltrados.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      onSelecionarEstado && onSelecionarEstado(item)
                    }
                  >
                    <Td>{item.estado}</Td>
                    <Td>{item.sigla}</Td>
                    <Td>{item.Paises ? item.Paises.pais : "—"}</Td>
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

export default ListarEstados;
