import React from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";

import ListarMateriasPorTurma from "./ListarMateriasPorTurma";

const MateriasTurma = () => {
  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <ListarMateriasPorTurma />
        </AreaComponents>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default MateriasTurma;
