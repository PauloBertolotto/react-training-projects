import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

const OpAvaliacoes = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value !== "default") {
      navigate(e.target.value);
    }
  };

  return (
    <div
      className="
        flex flex-row
        items-start
        p-2 mt-4
        rounded-xl
        bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]
        shadow-lg
        text-gray-100
      "
    >
      {/* Select à esquerda */}
      <div className="flex flex-col justify-start mr-2">
        <select
          onChange={handleChange}
          defaultValue="default"
          className="
            px-4 py-2
            rounded-lg
            bg-[#1a1a1a]
            text-gray-100
            font-semibold
            border border-[#00ffff]
            shadow-md
            focus:outline-none focus:ring-2 focus:ring-[#00ffff]
            hover:border-[#00e0e0]
            transition-all duration-300
            cursor-pointer
            appearance-none
          "
        >
          <option value="default" disabled>
            Escolha
          </option>

          {/* Só mostra "Lançar Notas" se NÃO for aluno */}
          {user?.acesso !== "aluno" && (
            <option value="/conteudo/opavaliacoes/avaliacoes">
              Lançar Notas
            </option>
          )}

          {/* Todos podem ver "Notas" */}
          <option value="/conteudo/opavaliacoes/notas">Notas</option>
        </select>
      </div>

      {/* Outlet à direita */}
      <div className="flex-1 outlet-localizacao">
        <Outlet />
      </div>
    </div>
  );
};

export default OpAvaliacoes;
