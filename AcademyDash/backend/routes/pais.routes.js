import { Router } from "express";
import {
  criarPais,
  listarPaises,
  buscarPaisPorId,
  atualizarPais,
  deletarPais,
} from "../controllers/pais.controller.js";

const router = Router();

// CREATE
router.post("/", criarPais);

// READ (all)
router.get("/", listarPaises);

// READ (by id)
router.get("/:id", buscarPaisPorId);

// UPDATE
router.put("/:id", atualizarPais);

// DELETE
router.delete("/:id", deletarPais);

export default router;
