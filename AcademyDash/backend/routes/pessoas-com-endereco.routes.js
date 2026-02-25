import { Router } from "express";
import {
  criarPessoaComEndereco,
  atualizarPessoaComEndereco,
} from "../controllers/pessoas-com-endereco.controller.js";

const router = Router();

// CREATE
router.post("/", criarPessoaComEndereco);

// UPDATE
router.put("/:id", atualizarPessoaComEndereco);

export default router;
