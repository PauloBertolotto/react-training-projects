import React, { useState } from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";

import RelatoriosAlunos from "./SobreAlunos/RelatoriosAlunos";

const Relatorios = () => {
  return (
    <GestaoDados>
      <SubTitle>Relatórios</SubTitle>
      <CorpoComponents>
        <AreaComponents>
          <RelatoriosAlunos />
        </AreaComponents>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Relatorios;
