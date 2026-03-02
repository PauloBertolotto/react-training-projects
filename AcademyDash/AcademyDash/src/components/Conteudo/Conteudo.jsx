import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { AuthContext } from "../../Context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

export default function Conteudo() {
  const { user, isAuthenticated, hasRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dataHora, setDataHora] = useState("");

  useEffect(() => {
    const atualizarDataHora = () => {
      const agora = new Date();
      const formatado = agora.toLocaleString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setDataHora(formatado);
    };

    atualizarDataHora();
    const interval = setInterval(atualizarDataHora, 60000);
    return () => clearInterval(interval);
  }, []);

  const nome = user?.nome || user?.email || "Usuário";

  const handleLogout = () => {
    logout(); // limpa estado de autenticação
    navigate("/login"); // redireciona para login
  };

  return (
    <div className="flex justify-center bg-[var(--background)] text-[var(--text-dark)]">
      <div>
        <div className="flex flex-col p-4 m-4 rounded-md w-[1600px] h-[700px] shadow-md bg-white">
          <div className="font-bold p-2 border-b flex items-center justify-between border-gray-300">
            <div>
              <h2 className="text-lg">
                Bem-vindo, {isAuthenticated() ? nome : "Visitante"}
              </h2>
            </div>

            <div className="flex items-center gap-4 text-sm">
              {/* Data e hora */}
              <span className="px-3 py-1 bg-[var(--table-bg)] border border-gray-300 rounded text-[var(--text-dark)]">
                {dataHora}
              </span>

              {/* Badge de acesso */}
              {hasRole && hasRole("admin") && (
                <span className="px-3 py-1 bg-[var(--secondary)] text-[var(--text-light)] rounded">
                  Admin
                </span>
              )}
              {hasRole && hasRole("professor") && (
                <span className="px-3 py-1 bg-green-500 text-[var(--text-light)] rounded">
                  Professor
                </span>
              )}
              {hasRole && hasRole("aluno") && (
                <span className="px-3 py-1 bg-yellow-400 text-[var(--text-dark)] rounded">
                  Aluno
                </span>
              )}

              {/* Botão logout */}
              {isAuthenticated() && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                  px-3 py-1
                  bg-red-600 text-white
                  rounded
                  transition-colors duration-300
                  hover:bg-red-700
                  flex items-center gap-2
                  cursor-pointer
                  z-10
                "
                  title="Sair"
                >
                  <FaSignOutAlt className="text-lg" />
                  Sair
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 min-h-[400px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
