import express from "express";

import {
  criarProfessor,
  listarProfessores,
  buscarProfessorPorId,
  atualizarProfessor,
  deletarProfessor,
  listarProfessoresComDisciplina,
  buscarProfessorComDisciplinaPorId,
  atualizarDisciplinaProfessor,
} from "../controllers/professor.controller.js";

const router = express.Router();

// CREATE professor + vínculo
router.post("/", criarProfessor);

// READ (all)
router.get("/", listarProfessores);

// READ (all + disciplina)
router.get("/com-disciplina", listarProfessoresComDisciplina);

// READ (by id)
router.get("/:id", buscarProfessorPorId);

// READ (by id + disciplina)
router.get("/:id/com-disciplina", buscarProfessorComDisciplinaPorId);

// UPDATE
router.put("/:id", atualizarProfessor);

// UPDATE disciplina vinculada
router.put("/:id/disciplina", atualizarDisciplinaProfessor);

// DELETE
router.delete("/:id", deletarProfessor);

export default router;
