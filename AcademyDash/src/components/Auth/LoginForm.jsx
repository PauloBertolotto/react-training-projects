import React, { useState } from "react";
import Label from "../Core/Label";
import Input from "../Core/Input";
import Btn_Add from "../Conteudo/BodyCrud/Btn_Add";

export default function LoginForm({ onSubmit, loading = false, error = "" }) {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanCpf = cpf.replace(/\D/g, "");
    if (typeof onSubmit === "function") onSubmit(cleanEmail, cleanCpf);
  };

  return (
    <div className="flex justify-center mt-24 w-full">
      <div className="p-6 max-w-md w-full bg-white rounded shadow">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <h3 className="mb-4 text-xl font-semibold text-center">Entrar</h3>

          <div className="flex flex-col gap-2 w-full items-center">
            <Label htmlFor="email" className="text-center">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              error={""}
              className="text-center"
            />
          </div>

          <div className="flex flex-col gap-2 w-full items-center">
            <Label htmlFor="cpf" className="text-center">
              CPF
            </Label>
            <Input
              id="cpf"
              name="cpf"
              type="text"
              value={cpf}
              maxLength={14}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                let formatted = onlyDigits;
                if (onlyDigits.length > 3)
                  formatted = `${onlyDigits.slice(0, 3)}.${onlyDigits.slice(3)}`;
                if (onlyDigits.length > 6)
                  formatted = `${onlyDigits.slice(0, 3)}.${onlyDigits.slice(3, 6)}.${onlyDigits.slice(6)}`;
                if (onlyDigits.length > 9)
                  formatted = `${onlyDigits.slice(0, 3)}.${onlyDigits.slice(3, 6)}.${onlyDigits.slice(6, 9)}-${onlyDigits.slice(9, 11)}`;
                setCpf(formatted);
              }}
              placeholder="000.000.000-00"
              error={""}
              className="text-center"
            />
          </div>

          {error && (
            <div className="text-red-500 mb-2 text-center">{error}</div>
          )}

          <Btn_Add type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Btn_Add>
        </form>
      </div>
    </div>
  );
}
