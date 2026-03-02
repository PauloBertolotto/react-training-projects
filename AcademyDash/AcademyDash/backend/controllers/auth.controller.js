import jwt from "jsonwebtoken";
import { supabase } from "../services/supabase.js";

const JWT_SECRET = process.env.JWT_SECRET || "troque_esta_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";

export const login = async (req, res) => {
  try {
    const { email, cpf } = req.body;
    if (!email || !cpf) {
      return res.status(400).json({ message: "Email e CPF obrigatórios" });
    }

    const cpfNormalized = (cpf || "").replace(/\D/g, "");
    const { data: pessoa, error } = await supabase
      .from("Pessoa")
      .select("id, nome, email, cpf, acesso")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase (login):", error.message);
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }

    if (!pessoa) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const storedCpf = (pessoa.cpf || "").replace(/\D/g, "");
    if (storedCpf !== cpfNormalized) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const payload = {
      id: pessoa.id,
      email: pessoa.email,
      acesso: pessoa.acesso,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(200).json({ token, user: payload });
  } catch (err) {
    console.error("Erro inesperado (login):", err.message);
    return res.status(500).json({ message: "Erro no login" });
  }
};
