import React, { useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";
import Modal from "../../Core/Modal";
import Btn_ModalAdd from "../../Core/Btn_ModalAdd";

import AddDisciplina from "./AddDisciplina";
import ListarDisciplina from "./ListarDisciplina";
import AlterarDisciplina from "./AlterarDisciplina";

const Disciplina = () => {
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [modalAlterar, setModalAlterar] = useState(false);

  const { user } = useContext(AuthContext);
  const isAdmin = user?.acesso === "admin";
  const isProfessor = user?.acesso === "professor";

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          {isAdmin && (
            <div className="flex gap-2 mb-4">
              <Btn_ModalAdd
                label="Nova Disciplina"
                title="Adicionar Disciplina"
              >
                <AddDisciplina />
              </Btn_ModalAdd>
            </div>
          )}

          <ListarDisciplina
            onSelecionarDisciplina={(disciplina) => {
              if (isAdmin) {
                setDisciplinaSelecionada(disciplina);
                setModalAlterar(true);
              }
            }}
          />

          {isAdmin && (
            <Modal
              isOpen={modalAlterar}
              onClose={() => setModalAlterar(false)}
              title="Alterar Disciplina"
            >
              <AlterarDisciplina
                disciplina={disciplinaSelecionada}
                onVoltar={() => {
                  setDisciplinaSelecionada(null);
                  setModalAlterar(false);
                }}
                onDisciplinaAlterada={() => {
                  setDisciplinaSelecionada(null);
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

export default Disciplina;
