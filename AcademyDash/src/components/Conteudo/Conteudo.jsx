import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { AuthContext } from "../../Context/AuthContext";

export default function Conteudo() {
  const { user, isAuthenticated, hasRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const nome = user?.nome || user?.email || "Usuário";
  const acesso = user?.acesso || "não autenticado";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="flex flex-col p-4 m-4 rounded-md border border-white bg-[#141414] w-[1600px] h-[700px]">
          {/* Cabeçalho */}
          <div className="font-bold p-2 border-b border-white flex items-center justify-between">
            <div>
              <h2 className="text-lg text-white">
                Bem-vindo, {isAuthenticated() ? nome : "Visitante"}
              </h2>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-700">
              {/* badges por papel */}
              {hasRole && hasRole("admin") && (
                <span className="px-2 py-1 bg-blue-600 text-white rounded">
                  Admin
                </span>
              )}
              {hasRole && hasRole("professor") && (
                <span className="px-2 py-1 bg-green-600 text-white rounded">
                  Professor
                </span>
              )}
              {hasRole && hasRole("aluno") && (
                <span className="px-2 py-1 bg-yellow-600 text-black rounded">
                  Aluno
                </span>
              )}

              {/* botão de logout */}
              {isAuthenticated() && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 text-white rounded transition-colors duration-300 hover:bg-red-700"
                >
                  Sair
                </button>
              )}
            </div>
          </div>

          {/* Corpo */}
          <div className="mt-4 min-h-[400px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
