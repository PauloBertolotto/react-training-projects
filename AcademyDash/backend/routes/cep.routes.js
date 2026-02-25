import express from "express";
import { buscarCep } from "../serverAPI.js";

const router = express.Router();

router.get("/:cep", async (req, res) => {
  try {
    const { cep } = req.params;
    const dados = await buscarCep(cep);
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
