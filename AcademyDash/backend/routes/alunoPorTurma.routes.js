import express from "express";
import { listarAlunosPorTurma } from "../controllers/alunoPorTurma.controller.js";

const router = express.Router();

router.get("/:turma_id", listarAlunosPorTurma);

export default router;
