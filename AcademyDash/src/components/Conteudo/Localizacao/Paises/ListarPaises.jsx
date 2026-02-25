import React, { useEffect, useState } from "react";

import Area from "../../BodyCrud/area";
import DadosAchados from "../../BodyCrud/DadosAchados";
import FiltrosLista from "../../BodyCrud/FiltrosLista";
import Btn_Ex from "../../BodyCrud/Btn_Ex";

import Table from "../../../Core/Table";
import Tr from "../../../Core/Tr";
import Th from "../../../Core/Th";
import Td from "../../../Core/Td";

import { getPaises, deletePais } from "@/services/paises";

const ListarPaises = ({ onSelecionarPais }) => {
  const [filtroPais, setFiltroPais] = useState("");
  const [filtroSigla, setFiltroSigla] = useState("");
  const [filtroContinente, setFiltroContinente] = useState("");

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
      filtroContinente === "" ||
      item.continente.toLowerCase() === filtroContinente.toLowerCase();

    return matchPais && matchSigla && matchContinente;
  });

  return (
    <Area className="listar-turmas-area">
      <FiltrosLista>
        <input
          type="text"
          placeholder="Filtrar por país"
          value={filtroPais}
          onChange={(e) => setFiltroPais(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por sigla"
          value={filtroSigla}
          onChange={(e) => setFiltroSigla(e.target.value)}
        />
        <select
          id="continente"
          name="continente"
          value={filtroContinente}
          onChange={(e) => setFiltroContinente(e.target.value)}
          className="input"
        >
          <option value="">Selecione...</option>
          <option value="Africa">África</option>
          <option value="America do Norte">América do Norte</option>
          <option value="America Central">América Central</option>
          <option value="America do Sul">América do Sul</option>
          <option value="Antartida">Antártida</option>
          <option value="Asia">Ásia</option>
          <option value="Europa">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p>Carregando Países...</p>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>País</Th>
                <Th>Sigla</Th>
                <Th>Continente</Th>
                <Th>DDI</Th>
                <Th>Moeda</Th>
                <Th></Th>
              </Tr>
            </thead>
            <tbody>
              {paisesFiltrados.length === 0 ? (
                <tr>
                  <Td colSpan="6">Nenhum país encontrado</Td>
                </tr>
              ) : (
                paisesFiltrados.map((item) => (
                  <tr key={item.id} onClick={() => onSelecionarPais(item)}>
                    <Td>{item.pais}</Td>
                    <Td>{item.sigla}</Td>
                    <Td>{item.continente}</Td>
                    <Td>{item.ddi}</Td>
                    <Td>{item.moeda}</Td>
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

export default ListarPaises;
