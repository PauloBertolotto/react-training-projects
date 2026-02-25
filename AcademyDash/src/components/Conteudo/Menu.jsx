import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import CustomNavLink from "../Core/CustomNavLink";

const Menu = () => {
  const { isAuthenticated, hasRole } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-stretch bg-[#1a1a1a] p-5 rounded-xl max-w-[250px] shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col gap-3">
        {isAuthenticated() && hasRole("admin") && (
          <>
            <CustomNavLink to="/conteudo/usuario">Novo Usuário</CustomNavLink>
            <CustomNavLink to="/conteudo/localizacao">
              Localização
            </CustomNavLink>
          </>
        )}

        {isAuthenticated() && hasRole("professor", "admin") && (
          <>
            <CustomNavLink to="/conteudo/aluno">Alunos</CustomNavLink>
            <CustomNavLink to="/conteudo/professor">Professores</CustomNavLink>
            <CustomNavLink to="/conteudo/opturma">Turmas</CustomNavLink>
            <CustomNavLink to="/conteudo/disciplina">Disciplinas</CustomNavLink>
            <CustomNavLink to="/conteudo/opavaliacoes">
              Avaliações
            </CustomNavLink>
            <CustomNavLink to="/conteudo/relatorios">Relatórios</CustomNavLink>
          </>
        )}

        {isAuthenticated() && hasRole("aluno") && (
          <CustomNavLink to="/conteudo/opavaliacoes">Avaliações</CustomNavLink>
        )}
      </div>
    </div>
  );
};

export default Menu;
