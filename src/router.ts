import { Router, Request, Response } from "express";

const router = Router();

// Autenticacion y registro de usuarios
router.post("/auth/register", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Registrado");
});

export default router;
