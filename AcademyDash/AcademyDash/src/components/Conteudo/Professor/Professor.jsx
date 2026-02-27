import React, { useState } from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";
import Modal from "../../Core/Modal";

import ListarProfessores from "./ListarProfessor";
import ProfessorDisciplina from "./ProfessorDisciplina";

const Professores = () => {
  const [professorSelecionado, setProfessorSelecionado] = useState(null);
  const [modalAlterar, setModalAlterar] = useState(false);

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <ListarProfessores
            onSelecionarProfessor={(professor) => {
              setProfessorSelecionado(professor);
              setModalAlterar(true);
            }}
          />

          {/* Modal para vincular disciplina ao professor */}
          <Modal
            isOpen={modalAlterar}
            onClose={() => setModalAlterar(false)}
            title="Vincular Disciplina ao Professor"
          >
            <ProfessorDisciplina
              professor={professorSelecionado}
              onVoltar={() => {
                setProfessorSelecionado(null);
                setModalAlterar(false);
              }}
              onDisciplinaVinculada={() => {
                setProfessorSelecionado(null);
                setModalAlterar(false);
              }}
            />
          </Modal>
        </AreaComponents>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Professores;
