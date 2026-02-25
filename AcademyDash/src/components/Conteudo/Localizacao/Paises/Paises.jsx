import React, { useState } from "react";

import GestaoDados from "../../BodyCrud/GestaoDados";
import CorpoComponents from "../../BodyCrud/CorpoComponents";
import AreaComponents from "../../BodyCrud/AreaComponents";

import SubTitle from "../../../Core/SubTitle";
import Modal from "../../../Core/Modal";

import AddPaises from "./AddPaises";
import ListarPaises from "./ListarPaises";
import AlterarPaises from "./AlterarPaises";

const Paises = () => {
  const [paisSelecionada, setPaisSelecionada] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalAlterar, setModalAlterar] = useState(false);

  const handleSelecionarPaises = (pais) => {
    setPaisSelecionada(pais);
    setModalAlterar(true);
  };

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setModalAdd(true)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Novo País
            </button>
          </div>

          <ListarPaises onSelecionarPais={handleSelecionarPaises} />

          {/* Modal para adicionar país */}
          <Modal
            isOpen={modalAdd}
            onClose={() => setModalAdd(false)}
            title="Adicionar País"
          >
            <AddPaises
              onVoltar={() => setModalAdd(false)}
              onPaisAdicionado={() => setModalAdd(false)}
            />
          </Modal>

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
