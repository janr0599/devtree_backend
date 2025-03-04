import { Router, Request, Response } from "express";

const router = Router();

// Auteticacion y registro de usuarios
router.post("/auth/register", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Registrado");
});

export default router;
