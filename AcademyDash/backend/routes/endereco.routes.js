import { Router } from "express";
import {
  criarEndereco,
  listarEnderecos,
  buscarEnderecoPorId,
  atualizarEndereco,
  deletarEndereco,
} from "../controllers/endereco.controller.js";

const router = Router();

// CREATE
router.post("/", criarEndereco);

// READ (all)
router.get("/", listarEnderecos);

// READ (by id)
router.get("/:id", buscarEnderecoPorId);

// UPDATE
router.put("/:id", atualizarEndereco);

// DELETE
router.delete("/:id", deletarEndereco);

export default router;
