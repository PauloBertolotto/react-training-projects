// src/App.jsx
import Title from "./components/Core/Title";
import { Outlet } from "react-router-dom";
import Menu from "./components/Conteudo/Menu";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import "./App.css";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="bg-[var(--background)] min-h-screen text-[var(--text-dark)]">
      <header className="header bg-[var(--sidebar)] shadow-md">
        <Title>AcademyDash</Title>
      </header>

      <main className="body flex">
        {isAuthenticated() && <Menu />}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
