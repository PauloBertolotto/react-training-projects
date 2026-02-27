import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./Context/AuthProvider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Conteudo from "./components/Conteudo/Conteudo.jsx";
import OpTurmas from "./components/Conteudo/Turma/OpTurmas.jsx";
import Turma from "./components/Conteudo/Turma/Turma.jsx";
import VincularDisciplina from "./components/Conteudo/Turma/VincularDIsciplina/VincularDisciplina.jsx";
import MateriasTurma from "./components/Conteudo/Turma/MateriasTurma.jsx";
import Localizacao from "./components/Conteudo/Localizacao/Localizacao.jsx";
import Paises from "./components/Conteudo/Localizacao/Paises/Paises.jsx";
import Estados from "./components/Conteudo/Localizacao/Estados/Estados.jsx";
import Cidades from "./components/Conteudo/Localizacao/Cidades/Cidades.jsx";
import Usuarios from "./components/Conteudo/CadUsuarios/Usuarios.jsx";
import Alunos from "./components/Conteudo/Aluno/Alunos.jsx";
import Professor from "./components/Conteudo/Professor/Professor.jsx";
import Disciplina from "./components/Conteudo/Disciplina/Disciplina.jsx";
import OpAvaliacoes from "./components/Conteudo/Avaliacoes/OpAvaliacoes.jsx";
import Avaliacoes from "./components/Conteudo/Avaliacoes/Avaliacoes.jsx";
import Notas from "./components/Conteudo/Avaliacoes/Notas.jsx";
import Relatorios from "./components/Conteudo/Relatorios/Relatorios.jsx";

// novos imports para autenticação e páginas de login/erro
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./components/Auth/LoginPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/login" replace />} />

            <Route path="login" element={<LoginPage />} />

            <Route
              path="conteudo"
              element={
                <PrivateRoute>
                  <Conteudo />
                </PrivateRoute>
              }
            >
              <Route path="opturma" element={<OpTurmas />}>
                <Route path="turma" element={<Turma />} />
                <Route
                  path="vinculardisciplina"
                  element={<VincularDisciplina />}
                />
                <Route path="materiasturma" element={<MateriasTurma />} />
              </Route>

              <Route path="localizacao" element={<Localizacao />}>
                <Route path="paises" element={<Paises />} />
                <Route path="estados" element={<Estados />} />
                <Route path="cidades" element={<Cidades />} />
              </Route>

              <Route
                path="usuario"
                element={
                  <PrivateRoute requiredRoles={["admin"]}>
                    <Usuarios />
                  </PrivateRoute>
                }
              />

              <Route
                path="aluno"
                element={
                  <PrivateRoute requiredRoles={["aluno", "professor", "admin"]}>
                    <Alunos />
                  </PrivateRoute>
                }
              />

              <Route
                path="disciplina"
                element={
                  <PrivateRoute requiredRoles={["professor", "admin"]}>
                    <Disciplina />
                  </PrivateRoute>
                }
              />

              <Route
                path="professor"
                element={
                  <PrivateRoute requiredRoles={["professor", "admin"]}>
                    <Professor />
                  </PrivateRoute>
                }
              />

              <Route path="opavaliacoes" element={<OpAvaliacoes />}>
                <Route path="avaliacoes" element={<Avaliacoes />} />
                <Route path="notas" element={<Notas />} />
              </Route>

              <Route
                path="relatorios"
                element={
                  <PrivateRoute requiredRoles={["admin", "professor"]}>
                    <Relatorios />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
