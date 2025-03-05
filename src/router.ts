import { Router } from "express";
import { createUser } from "./handlers";

const router = Router();

// Autenticacion y registro de usuarios
router.post("/auth/register", createUser);

export default router;
