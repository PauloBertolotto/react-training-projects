import { Router } from "express";
import {
  criarPessoa,
  listarPessoas,
  buscarPessoaPorId,
  atualizarPessoa,
  deletarPessoa,
} from "../controllers/pessoa.controller.js";

const router = Router();

// CREATE
router.post("/", criarPessoa);

// READ (all)
router.get("/", listarPessoas);

// READ (by id)
router.get("/:id", buscarPessoaPorId);

// UPDATE
router.put("/:id", atualizarPessoa);

// DELETE
router.delete("/:id", deletarPessoa);

export default router;
