import React, { useState } from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";

import ListarAlunos from "./ListarAlunos";
// import ListarTurmas from "../Turma/CrudTurma/ListarTurmas";
// import AlunoTurma from "./AlunoTurma";

const Aluno = () => {
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  const handleVinculoSalvo = (alunoId, turmaId) => {
    if (turmaId) {
      setTurmaSelecionada({ id: turmaId });
    } else {
      setTurmaSelecionada(null);
    }

    setAlunoSelecionado((prev) => {
      if (!prev) return prev;
      if (prev.id === alunoId) {
        return { ...prev, turma_id: turmaId };
      }
      return prev;
    });
  };

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <ListarAlunos
            onSelecionarAluno={setAlunoSelecionado}
            onVinculoSalvo={handleVinculoSalvo}
          />
        </AreaComponents>

        {/* <AreaComponents>
          <AlunoTurma
            aluno={alunoSelecionado}
            turma={turmaSelecionada}
            onVinculoSalvo={(alunoId, turmaId) =>
              handleVinculoSalvo(alunoId, turmaId)
            }
          />
        </AreaComponents> */}

        {/* <AreaComponents>
          <ListarTurmas onSelecionarTurma={setTurmaSelecionada} statusFiltro="Ativo" />
        </AreaComponents> */}
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Aluno;
