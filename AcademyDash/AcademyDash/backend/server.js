import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import turmaRoutes from "./routes/turma.routes.js";
import paisRoutes from "./routes/pais.routes.js";
import estadoRoutes from "./routes/estado.routes.js";
import cidadeRoutes from "./routes/cidade.routes.js";
import pessoaRoutes from "./routes/pessoa.routes.js";
import enderecoRoutes from "./routes/endereco.routes.js";
import pessoaEnderecoRoutes from "./routes/pessoas-com-endereco.routes.js";
import alunoRoutes from "./routes/aluno.routes.js";
import professorRoutes from "./routes/professor.routes.js";
import disciplinaRoutes from "./routes/disciplina.routes.js";
import turmaDisciplinaRoutes from "./routes/turma_disciplina.routes.js";
import alunoPorTurmaRoutes from "./routes/alunoPorTurma.routes.js";
import disciplinasPorTurmaRoutes from "./routes/disciplinasPorTurma.routes.js";
import notasRoutes from "./routes/notas.routes.js";
import relatoriosRoutes from "./routes/relatorios.routes.js";
import cepRoutes from "./routes/cep.routes.js";

import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middlewares/auth.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (_req, res) => {
  res.send("API rodando");
});

// Rota de autenticação
app.use("/auth", authRoutes);

// Rotas públicas
app.use("/cep", cepRoutes);

// Rotas da aplicação
app.use("/turmas", turmaRoutes);
app.use("/paises", paisRoutes);
app.use("/estados", estadoRoutes);
app.use("/cidades", cidadeRoutes);
app.use("/pessoas", pessoaRoutes);
app.use("/enderecos", enderecoRoutes);
app.use("/pessoas-com-endereco", pessoaEnderecoRoutes);
app.use("/alunos", alunoRoutes);
app.use("/professores", professorRoutes);
app.use("/disciplinas", disciplinaRoutes);
app.use("/turma-disciplina", turmaDisciplinaRoutes);
app.use("/alunoPorTurma", alunoPorTurmaRoutes);
app.use("/disciplinasPorTurma", disciplinasPorTurmaRoutes);
app.use("/notas", notasRoutes);
app.use("/relatorios", relatoriosRoutes);

// Tratamento de erros centralizado
app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err?.status || 500)
    .json({ message: err?.message || "Erro interno" });
});

// Porta
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
