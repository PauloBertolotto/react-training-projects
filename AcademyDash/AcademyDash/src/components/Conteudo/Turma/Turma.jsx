import React, { useState, useContext } from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";
import Modal from "../../Core/Modal";
import Btn_ModalAdd from "../../Core/Btn_ModalAdd";

import AddTurma from "./CrudTurma/AddTurma";
import ListarTurmas from "./CrudTurma/ListarTurmas";
import AlterarTurma from "./CrudTurma/AlterarTurma";
import { AuthContext } from "../../../Context/AuthContext";

const Turma = () => {
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [modalAlterar, setModalAlterar] = useState(false);
  const { user } = useContext(AuthContext);

  const isProfessor = user?.acesso === "professor";
  const isAdmin = user?.acesso === "admin";

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          {/* Botão só aparece para admin */}
          {isAdmin && (
            <div className="flex gap-2 mb-1">
              <Btn_ModalAdd label="Nova Turma" title="Adicionar Turma">
                <AddTurma />
              </Btn_ModalAdd>
            </div>
          )}

          <ListarTurmas
            onSelecionarTurma={(turma) => {
              if (isAdmin) {
                setTurmaSelecionada(turma);
                setModalAlterar(true);
              }
            }}
          />

          {/* Modal para alterar turma (apenas admin) */}
          {isAdmin && (
            <Modal
              isOpen={modalAlterar}
              onClose={() => setModalAlterar(false)}
              title="Alterar Turma"
            >
              <AlterarTurma
                turma={turmaSelecionada}
                onVoltar={() => {
                  setTurmaSelecionada(null);
                  setModalAlterar(false);
                }}
                onTurmaAlterada={() => {
                  setTurmaSelecionada(null);
                  setModalAlterar(false);
                }}
              />
            </Modal>
          )}
        </AreaComponents>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Turma;
