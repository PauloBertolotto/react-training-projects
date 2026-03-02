import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import {
  FaChevronRight,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaChartBar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CustomNavLink from "../Core/CustomNavLink";

const Menu = () => {
  const { user, isAuthenticated, hasRole } = useContext(AuthContext);
  const [openLocalizacao, setOpenLocalizacao] = useState(false);
  const [openTurmas, setOpenTurmas] = useState(false);
  const [openAvaliacoes, setOpenAvaliacoes] = useState(false);

  return (
    <aside className="flex flex-col justify-between bg-[var(--sidebar)] text-[var(--text-light)] w-[280px] h-full rounded-xl shadow-md">
      {/* Topo */}
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">Minha Escola</h2>
        <p className="text-xs text-gray-400">Painel Acadêmico</p>
      </div>

      {/* Conteúdo */}
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {isAuthenticated() && hasRole("admin") && (
          <>
            <Badge variant="secondary" className="uppercase tracking-wide">
              Administração
            </Badge>

            {/* Localização expansível */}
            <Button
              variant="ghost"
              className="flex justify-between w-full"
              onClick={() => setOpenLocalizacao(!openLocalizacao)}
            >
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt /> Localização
              </span>
              <FaChevronRight
                className={`transition-transform ${openLocalizacao ? "rotate-90" : ""}`}
              />
            </Button>
            {openLocalizacao && (
              <div className="ml-6 flex flex-col gap-2">
                <CustomNavLink to="/conteudo/localizacao/paises">
                  Países
                </CustomNavLink>
                <CustomNavLink to="/conteudo/localizacao/estados">
                  Estados
                </CustomNavLink>
                <CustomNavLink to="/conteudo/localizacao/cidades">
                  Cidades
                </CustomNavLink>
              </div>
            )}

            <CustomNavLink to="/conteudo/usuario" icon={FaUserGraduate}>
              Novo Usuário
            </CustomNavLink>
          </>
        )}

        {isAuthenticated() && hasRole("professor", "admin") && (
          <>
            <Badge variant="secondary" className="uppercase tracking-wide">
              Acadêmico
            </Badge>
            <CustomNavLink to="/conteudo/aluno" icon={FaUserGraduate}>
              Alunos
            </CustomNavLink>
            <CustomNavLink to="/conteudo/professor" icon={FaChalkboardTeacher}>
              Professores
            </CustomNavLink>

            {/* Turmas expansível */}
            <Button
              variant="ghost"
              className="flex justify-between w-full"
              onClick={() => setOpenTurmas(!openTurmas)}
            >
              <span className="flex items-center gap-2">
                <FaUsers /> Turmas
              </span>
              <FaChevronRight
                className={`transition-transform ${openTurmas ? "rotate-90" : ""}`}
              />
            </Button>
            {openTurmas && (
              <div className="ml-6 flex flex-col gap-2">
                <CustomNavLink to="/conteudo/opturma/turma">
                  Gerenciar
                </CustomNavLink>
                <CustomNavLink to="/conteudo/opturma/vinculardisciplina">
                  Vincular
                </CustomNavLink>
                <CustomNavLink to="/conteudo/opturma/materiasturma">
                  Turmas
                </CustomNavLink>
              </div>
            )}

            <CustomNavLink to="/conteudo/disciplina" icon={FaBook}>
              Disciplinas
            </CustomNavLink>
          </>
        )}

        {isAuthenticated() && (
          <>
            <Badge variant="secondary" className="uppercase tracking-wide">
              Gestão
            </Badge>
            <Button
              variant="ghost"
              className="flex justify-between w-full"
              onClick={() => setOpenAvaliacoes(!openAvaliacoes)}
            >
              <span className="flex items-center gap-2">
                <FaClipboardList /> Avaliações
              </span>
              <FaChevronRight
                className={`transition-transform ${openAvaliacoes ? "rotate-90" : ""}`}
              />
            </Button>
            {openAvaliacoes && (
              <div className="ml-6 flex flex-col gap-2">
                {(hasRole("admin") || hasRole("professor")) && (
                  <CustomNavLink to="/conteudo/opavaliacoes/avaliacoes">
                    Lançar Notas
                  </CustomNavLink>
                )}
                <CustomNavLink to="/conteudo/opavaliacoes/notas">
                  Notas
                </CustomNavLink>
              </div>
            )}

            {hasRole("admin") && (
              <CustomNavLink to="/conteudo/relatorios" icon={FaChartBar}>
                Relatórios
              </CustomNavLink>
            )}
          </>
        )}
      </nav>

      {/* Rodapé com perfil */}
      <div className="p-4 border-t border-gray-300 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
          {user?.nome?.[0] || "U"}
        </div>
        <div>
          <p className="text-sm font-semibold">{user?.nome || "Usuário"}</p>
          <p className="text-xs text-gray-400">
            {user?.email || "email@dominio.com"}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Menu;
