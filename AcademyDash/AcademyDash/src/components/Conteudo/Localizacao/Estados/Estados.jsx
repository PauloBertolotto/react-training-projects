import React, { useState } from "react";

import GestaoDados from "../../BodyCrud/GestaoDados";
import CorpoComponents from "../../BodyCrud/CorpoComponents";
import AreaComponents from "../../BodyCrud/AreaComponents";

import SubTitle from "../../../Core/SubTitle";
import Modal from "../../../Core/Modal";
import Btn_ModalAdd from "../../../Core/Btn_ModalAdd";

import AddEstados from "../Estados/AddEstados";
import ListarEstados from "../Estados/ListarEstados";
import AlterarEstados from "../Estados/AlterarEstados";

const Estados = () => {
  const [estadoSelecionada, setEstadoSelecionada] = useState(null);
  const [modalAlterar, setModalAlterar] = useState(false);

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <div className="flex gap-2 mb-4">
            <Btn_ModalAdd label="Novo Estado" title="Adicionar Estado">
              <AddEstados />
            </Btn_ModalAdd>
          </div>

          <ListarEstados
            onSelecionarEstado={(estado) => {
              setEstadoSelecionada(estado);
              setModalAlterar(true);
            }}
          />

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
