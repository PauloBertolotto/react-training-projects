import React, { useState } from "react";

import GestaoDados from "../../BodyCrud/GestaoDados";
import CorpoComponents from "../../BodyCrud/CorpoComponents";
import AreaComponents from "../../BodyCrud/AreaComponents";

import SubTitle from "../../../Core/SubTitle";
import Modal from "../../../Core/Modal";

import ListarTurmas from "../CrudTurma/ListarTurmas";
import VinculandoDisc from "./VinculandoDisc";
import ListarDisciplinas from "../../Disciplina/ListarDisciplina";

const VincularDisciplina = () => {
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [modalVincular, setModalVincular] = useState(false);

  const handleSelecionarTurma = (turma) => {
    setTurmaSelecionada(turma);
    setModalVincular(true);
  };

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <ListarTurmas onSelecionarTurma={handleSelecionarTurma} />
        </AreaComponents>

        <Modal
          isOpen={modalVincular}
          onClose={() => {
            setTurmaSelecionada(null);
            setModalVincular(false);
          }}
        >
          <VinculandoDisc
            turma={turmaSelecionada}
            onVoltar={() => {
              setTurmaSelecionada(null);
              setModalVincular(false);
            }}
            onDisciplinaVinculada={() => {
              setTurmaSelecionada(null);
              setModalVincular(false);
            }}
          />
        </Modal>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default VincularDisciplina;
