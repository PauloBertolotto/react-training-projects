import React, { useState } from "react";

import GestaoDados from "../../BodyCrud/GestaoDados";
import CorpoComponents from "../../BodyCrud/CorpoComponents";
import AreaComponents from "../../BodyCrud/AreaComponents";

import SubTitle from "../../../Core/SubTitle";
import Modal from "../../../Core/Modal";
import Btn_ModalAdd from "../../../Core/Btn_ModalAdd";

import AddPaises from "./AddPaises";
import ListarPaises from "./ListarPaises";
import AlterarPaises from "./AlterarPaises";

const Paises = () => {
  const [paisSelecionada, setPaisSelecionada] = useState(null);
  const [modalAlterar, setModalAlterar] = useState(false);

  const handleSelecionarPaises = (pais) => {
    setPaisSelecionada(pais);
    setModalAlterar(true);
  };

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <div className="flex gap-1 mb-2">
            <Btn_ModalAdd label="Novo País" title="Adicionar País">
              <AddPaises />
            </Btn_ModalAdd>
          </div>

          <ListarPaises onSelecionarPais={handleSelecionarPaises} />

          {/* Modal para alterar país */}
          <Modal
            isOpen={modalAlterar}
            onClose={() => setModalAlterar(false)}
            title="Alterar País"
          >
            <AlterarPaises
              pais={paisSelecionada}
              onVoltar={() => {
                setPaisSelecionada(null);
                setModalAlterar(false);
              }}
              onPaisAlterado={() => {
                setPaisSelecionada(null);
                setModalAlterar(false);
              }}
            />
          </Modal>
        </AreaComponents>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Paises;
