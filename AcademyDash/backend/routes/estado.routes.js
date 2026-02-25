import { Router } from "express";
import {
  criarEstado,
  listarEstados,
  buscarEstadoPorId,
  atualizarEstado,
  deletarEstado,
} from "../controllers/estado.controller.js";

const router = Router();

// CREATE
router.post("/", criarEstado);

// READ (all)
router.get("/", listarEstados);

// READ (by id)
router.get("/:id", buscarEstadoPorId);

// UPDATE
router.put("/:id", atualizarEstado);

// DELETE
router.delete("/:id", deletarEstado);

export default router;
