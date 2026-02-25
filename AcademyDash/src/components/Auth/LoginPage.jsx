import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { AuthContext } from "../../Context/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, cpf) => {
    setError(null);
    setLoading(true);
    try {
      await login(email, cpf);
      navigate("/conteudo");
    } catch (err) {
      setError(err.message || "Erro no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-24 w-full">
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  );
}
