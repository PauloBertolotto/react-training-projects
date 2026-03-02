// routes/notas.routes.js
import express from "express";
import {
  criarNota,
  listarNotas,
  listarNotasPorTurma,
  alterarNota,
  listarNotasPorAluno,
} from "../controllers/notas.controller.js";

const router = express.Router();

router.post("/", criarNota);
router.get("/", listarNotas);
router.get("/turma/:turmaId", listarNotasPorTurma);
router.get("/aluno/:pessoaId", listarNotasPorAluno);

router.put("/:id", alterarNota);

export default router;
