import React, { useState, useContext } from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";
import Modal from "../../Core/Modal";

import AddTurma from "./CrudTurma/AddTurma";
import ListarTurmas from "./CrudTurma/ListarTurmas";
import AlterarTurma from "./CrudTurma/AlterarTurma";
import { AuthContext } from "../../../Context/AuthContext";

const Turma = () => {
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalAlterar, setModalAlterar] = useState(false);
  const { user } = useContext(AuthContext);

  const isProfessor = user?.acesso === "professor";
  const isAdmin = user?.acesso === "admin";

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          {/* Botões só aparecem para admin */}
          {isAdmin && (
            <div className="flex gap-2 mb-1">
              <button
                onClick={() => setModalAdd(true)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Nova Turma
              </button>
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

          {/* Modal para adicionar turma (apenas admin) */}
          {isAdmin && (
            <Modal
              isOpen={modalAdd}
              onClose={() => setModalAdd(false)}
              title="Adicionar Turma"
            >
              <AddTurma
                onVoltar={() => setModalAdd(false)}
                onTurmaAdicionada={() => setModalAdd(false)}
              />
            </Modal>
          )}

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
