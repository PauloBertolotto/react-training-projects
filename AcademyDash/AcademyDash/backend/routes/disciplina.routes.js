import { Router } from "express";
import {
  criarDisciplina,
  listarDisciplinas,
  buscarDisciplinaPorId,
  atualizarDisciplina,
  deletarDisciplina,
} from "../controllers/disciplina.controller.js";

const router = Router();

// CREATE
router.post("/", criarDisciplina);

// READ (all)
router.get("/", listarDisciplinas);

// READ (by id)
router.get("/:id", buscarDisciplinaPorId);

// UPDATE
router.put("/:id", atualizarDisciplina);

// DELETE
router.delete("/:id", deletarDisciplina);

export default router;
