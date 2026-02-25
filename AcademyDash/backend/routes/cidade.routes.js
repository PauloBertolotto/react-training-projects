import { Router } from "express";
import {
  criarCidade,
  listarCidades,
  buscarCidadePorId,
  atualizarCidade,
  deletarCidade,
} from "../controllers/cidade.controller.js";

const router = Router();

// CREATE
router.post("/", criarCidade);

// READ (all)
router.get("/", listarCidades);

// READ (by id)
router.get("/:id", buscarCidadePorId);

// UPDATE
router.put("/:id", atualizarCidade);

// DELETE
router.delete("/:id", deletarCidade);

export default router;
