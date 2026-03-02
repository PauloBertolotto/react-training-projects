import React, { useState } from "react";

import GestaoDados from "../../BodyCrud/GestaoDados";
import CorpoComponents from "../../BodyCrud/CorpoComponents";
import AreaComponents from "../../BodyCrud/AreaComponents";

import SubTitle from "../../../Core/SubTitle";
import Modal from "../../../Core/Modal";
import Btn_ModalAdd from "../../../Core/Btn_ModalAdd";

import AddCidades from "../Cidades/AddCidades";
import ListarCidades from "../Cidades/ListarCidades";
import AlterarCidades from "../Cidades/AlterarCidades";

const Cidades = () => {
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  const [modalAlterar, setModalAlterar] = useState(false);

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <div className="flex gap-2 mb-4">
            <Btn_ModalAdd label="Nova Cidade" title="Adicionar Cidade">
              <AddCidades />
            </Btn_ModalAdd>
          </div>

          <ListarCidades
            onSelecionarCidade={(cidade) => {
              setCidadeSelecionada(cidade);
              setModalAlterar(true);
            }}
          />

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
