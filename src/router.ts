import { Router } from "express";
import { body } from "express-validator";
import { createUser, getUser, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

const router = Router();

// Autenticacion y registro de usuarios
router.post(
    "/auth/register",
    body("handle").notEmpty().withMessage("El handle es requerido"),
    body("name")
        .notEmpty()
        .withMessage("El nombre es requerido")
        .isString()
        .withMessage("El nombre debe ser una cadena de texto"),
    body("email").isEmail().withMessage("El email no es válido"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    handleInputErrors,
    createUser
);

router.post(
    "/auth/login",
    body("email").isEmail().withMessage("El email no es válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    handleInputErrors,
    login
);

router.get("/user", getUser);

export default router;
