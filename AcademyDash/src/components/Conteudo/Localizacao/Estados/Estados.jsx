import React, { useState } from "react";

import GestaoDados from "../../BodyCrud/GestaoDados";
import CorpoComponents from "../../BodyCrud/CorpoComponents";
import AreaComponents from "../../BodyCrud/AreaComponents";

import SubTitle from "../../../Core/SubTitle";
import Modal from "../../../Core/Modal";

import AddEstados from "../Estados/AddEstados";
import ListarEstados from "../Estados/ListarEstados";
import AlterarEstados from "../Estados/AlterarEstados";

const Estados = () => {
  const [estadoSelecionada, setEstadoSelecionada] = useState(null);
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
              Novo Estado
            </button>
          </div>

          <ListarEstados
            onSelecionarEstado={(estado) => {
              setEstadoSelecionada(estado);
              setModalAlterar(true);
            }}
          />

          {/* Modal para adicionar estado */}
          <Modal
            isOpen={modalAdd}
            onClose={() => setModalAdd(false)}
            title="Adicionar Estado"
          >
            <AddEstados
              onVoltar={() => setModalAdd(false)}
              onEstadoAdicionado={() => setModalAdd(false)}
            />
          </Modal>

          {/* Modal para alterar estado */}
          <Modal
            isOpen={modalAlterar}
            onClose={() => setModalAlterar(false)}
            title="Alterar Estado"
          >
            <AlterarEstados
              estado={estadoSelecionada}
              onVoltar={() => {
                setEstadoSelecionada(null);
                setModalAlterar(false);
              }}
              onEstadoAlterado={() => {
                setEstadoSelecionada(null);
                setModalAlterar(false);
              }}
            />
          </Modal>
        </AreaComponents>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Estados;
