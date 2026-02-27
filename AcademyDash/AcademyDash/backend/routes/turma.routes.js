import { Router } from "express";
import {
  criarTurma,
  listarTurmas,
  buscarTurmaPorId,
  atualizarTurma,
  deletarTurma,
} from "../controllers/turma.controller.js";

const router = Router();

// CREATE
router.post("/", criarTurma);

// READ (all)
router.get("/", listarTurmas);

// READ (by id)
router.get("/:id", buscarTurmaPorId);

// UPDATE
router.put("/:id", atualizarTurma);

// DELETE
router.delete("/:id", deletarTurma);

export default router;
