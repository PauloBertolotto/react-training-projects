import React, { useState } from "react";

import GestaoDados from "../../BodyCrud/GestaoDados";
import CorpoComponents from "../../BodyCrud/CorpoComponents";
import AreaComponents from "../../BodyCrud/AreaComponents";

import SubTitle from "../../../Core/SubTitle";
import Modal from "../../../Core/Modal";

import AddCidades from "../Cidades/AddCidades";
import ListarCidades from "../Cidades/ListarCidades";
import AlterarCidades from "../Cidades/AlterarCidades";

const Cidades = () => {
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalAlterar, setModalAlterar] = useState(false);

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setModalAdd(true)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Nova Cidade
            </button>
          </div>

          <ListarCidades
            onSelecionarCidade={(cidade) => {
              setCidadeSelecionada(cidade);
              setModalAlterar(true);
            }}
          />

          {/* Modal para adicionar cidade */}
          <Modal
            isOpen={modalAdd}
            onClose={() => setModalAdd(false)}
            title="Adicionar Cidade"
          >
            <AddCidades
              onVoltar={() => setModalAdd(false)}
              onCidadeAdicionada={() => setModalAdd(false)}
            />
          </Modal>

          {/* Modal para alterar cidade */}
          <Modal
            isOpen={modalAlterar}
            onClose={() => setModalAlterar(false)}
            title="Alterar Cidade"
          >
            <AlterarCidades
              cidade={cidadeSelecionada}
              onVoltar={() => {
                setCidadeSelecionada(null);
                setModalAlterar(false);
              }}
              onCidadeAlterada={() => {
                setCidadeSelecionada(null);
                setModalAlterar(false);
              }}
            />
          </Modal>
        </AreaComponents>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Cidades;
