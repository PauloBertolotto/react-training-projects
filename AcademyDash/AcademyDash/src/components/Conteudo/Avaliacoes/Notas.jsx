import React, { useState, useContext } from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";
import Modal from "../../Core/Modal";

import AlterarAvaliacao from "./AlterarAvaliacao";
import ListarNotas from "./ListarNotas";
import { AuthContext } from "../../../Context/AuthContext";

const Notas = () => {
  const [notaSelecionada, setNotaSelecionada] = useState(null);
  const [modalAlterar, setModalAlterar] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSelecionarAluno = (nota) => {
    setNotaSelecionada(nota);
    setModalAlterar(true);
  };

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <ListarNotas onSelecionarAluno={handleSelecionarAluno} />
        </AreaComponents>

        {user?.acesso !== "aluno" && (
          <Modal
            isOpen={modalAlterar}
            onClose={() => {
              setNotaSelecionada(null);
              setModalAlterar(false);
            }}
            title="Alterar Avaliação"
          >
            <AlterarAvaliacao
              notaSelecionada={notaSelecionada}
              onVoltar={() => {
                setNotaSelecionada(null);
                setModalAlterar(false);
              }}
              onAvaliacaoAlterada={() => {
                setNotaSelecionada(null);
                setModalAlterar(false);
              }}
            />
          </Modal>
        )}
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Notas;
