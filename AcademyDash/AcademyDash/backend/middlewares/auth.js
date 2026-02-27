// middlewares/auth.js
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "troque_esta_secret";

export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
