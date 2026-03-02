import { Router } from "express";
import {
  criarVinculoTurmaDisciplina,
  listarVinculosTurmaDisciplina,
  buscarVinculoPorId,
  atualizarVinculoTurmaDisciplina,
  deletarVinculoTurmaDisciplina,
  listarDisciplinasPorTurma,
} from "../controllers/turma_disciplina.controller.js";

const router = Router();

// CREATE
router.post("/", criarVinculoTurmaDisciplina);

// READ (all vínculos)
router.get("/", listarVinculosTurmaDisciplina);

// READ (disciplinas de uma turma específica)
router.get("/turma/:turmaId/disciplinas", listarDisciplinasPorTurma);

// READ (vínculo por id)
router.get("/:id", buscarVinculoPorId);

// UPDATE
router.put("/:id", atualizarVinculoTurmaDisciplina);

// DELETE
router.delete("/:id", deletarVinculoTurmaDisciplina);

export default router;
