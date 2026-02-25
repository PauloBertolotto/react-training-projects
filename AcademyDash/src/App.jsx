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
    <div id="App">
      <header className="header">
        <Title>AcademyDash</Title>
      </header>

      <main className="body">
        {isAuthenticated() && <Menu />}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
