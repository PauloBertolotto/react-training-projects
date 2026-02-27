import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm({ onSubmit, loading = false, error = "" }) {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [mostrarCpf, setMostrarCpf] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanCpf = cpf.replace(/\D/g, "");
    if (typeof onSubmit === "function") onSubmit(cleanEmail, cleanCpf);
  };

  return (
    <div className="flex justify-center mt-24 w-full">
      <div className="p-6 max-w-md w-full bg-[var(--table-bg)] text-[var(--text-dark)] rounded-xl shadow-md border border-gray-300">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <h3 className="mb-4 text-xl font-bold text-center text-[var(--secondary)]">
            Entrar
          </h3>

          <div className="flex gap-3 w-full items-center justify-center">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full text-center text-gray-900 bg-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-7 w-full items-center justify-center">
            <Label htmlFor="cpf">CPF</Label>
            <div className="relative w-full">
              <Input
                id="cpf"
                name="cpf"
                type={mostrarCpf ? "text" : "password"}
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
                className="w-full text-center text-gray-900 bg-white placeholder:text-gray-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setMostrarCpf(!mostrarCpf)}
                aria-label={mostrarCpf ? "Ocultar CPF" : "Mostrar CPF"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)]"
              >
                {mostrarCpf ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm mb-2 text-center">{error}</div>
          )}

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
