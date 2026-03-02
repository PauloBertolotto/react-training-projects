import { Router } from "express";
import {
  listarTurmas,
  listarDisciplinasPorTurma,
} from "../controllers/disciplinasPorTurma.controller.js";

const router = Router();

router.get("/turmas", listarTurmas);
router.get("/:turma_id", listarDisciplinasPorTurma);

export default router;
