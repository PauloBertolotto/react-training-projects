import React, { useState } from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";
import Modal from "../../Core/Modal";

import ListarAlunoPorTurma from "./ListarAlunosPorTurma";
import DisciplinasPorTurma from "./DisciplinasPorTurma";
import AvaliarAluno from "./AvaliarAluno";

const Avaliacao = () => {
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  const [modalAvaliar, setModalAvaliar] = useState(false);

  const handleSelecionarAluno = (aluno) => {
    setAlunoSelecionado(aluno);
    setModalAvaliar(true);
  };

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <ListarAlunoPorTurma onSelecionarAluno={handleSelecionarAluno} />
        </AreaComponents>

        {/* Modal para avaliar aluno */}
        <Modal
          isOpen={modalAvaliar}
          onClose={() => {
            setAlunoSelecionado(null);
            setModalAvaliar(false);
          }}
          title="Avaliar Aluno"
        >
          <AvaliarAluno
            aluno={alunoSelecionado}
            disciplinaSelecionada={disciplinaSelecionada}
            onVoltar={() => {
              setAlunoSelecionado(null);
              setModalAvaliar(false);
            }}
            onAvaliacaoConcluida={() => {
              setAlunoSelecionado(null);
              setModalAvaliar(false);
            }}
          />
        </Modal>

        {/* Modal para disciplinas por turma (se quiser habilitar depois) */}
        {/* 
        <Modal
          isOpen={modalDisciplina}
          onClose={() => setModalDisciplina(false)}
          title="Selecionar Disciplina"
        >
          <DisciplinasPorTurma
            turmaId={turmaSelecionada}
            onSelecionarDisciplina={setDisciplinaSelecionada}
          />
        </Modal>
        */}
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Avaliacao;
