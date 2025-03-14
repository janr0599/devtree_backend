import { Router } from "express";
import { body } from "express-validator";
import {
    createUser,
    getUser,
    login,
    saveLinks,
    updateProfile,
    uploadProfileImage,
} from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticateUser } from "./middleware/auth";

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

router.get("/user", authenticateUser, getUser);

// Actualizar usuario
router.patch(
    "/user",
    body("handle").notEmpty().withMessage("El handle es requerido"),
    handleInputErrors,
    authenticateUser,
    updateProfile
);

// Subir imagen de perfil
router.post("/user/image", authenticateUser, uploadProfileImage);

// Guardar social links
router.post(
    "/user/links",
    body("links")
        .notEmpty()
        .withMessage("Los links son requeridos")
        .isString()
        .withMessage("Los links deben ser un string"),
    authenticateUser,
    saveLinks
);

export default router;
