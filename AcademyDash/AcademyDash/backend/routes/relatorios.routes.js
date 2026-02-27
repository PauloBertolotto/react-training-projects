import { Router } from "express";
import {
  resumo,
  alunosDetalhes,
  disciplinas,
  frequenciaDisciplinas,
} from "../controllers/relatorios.controller.js";

const router = Router();

router.get("/resumo", resumo);

router.get("/alunos", alunosDetalhes);
router.get("/disciplinas", disciplinas);
router.get("/frequencia-disciplinas", frequenciaDisciplinas);

export default router;
