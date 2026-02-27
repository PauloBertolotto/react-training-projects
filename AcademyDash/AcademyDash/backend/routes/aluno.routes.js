import { Router } from "express";
import {
  criarAluno,
  listarAlunos,
  buscarAlunoPorId,
  atualizarAluno,
  deletarAluno,
  atualizarTurmaDeAluno,
} from "../controllers/aluno.controller.js";

const router = Router();

// CREATE
router.post("/", criarAluno);

// READ (all)
router.get("/", listarAlunos);

// UPDATE TURMA (mais específico, vem antes)
router.put("/pessoa/:pessoaId", atualizarTurmaDeAluno);

// READ (by id)
router.get("/:id", buscarAlunoPorId);

// UPDATE por id
router.put("/:id", atualizarAluno);

// DELETE
router.delete("/:id", deletarAluno);

export default router;
