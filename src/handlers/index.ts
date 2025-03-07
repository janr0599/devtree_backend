import { Request, Response } from "express";
import slug from "slug";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";

export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            const error = new Error("email ya registrado");
            res.status(409).json({ error: error.message });
            return;
        }

        //Generate handle
        const handle = slug(req.body.handle, "");
        const handleExists = await User.findOne({ handle });

        if (handleExists) {
            const error = new Error("handle no disponible");
            res.status(409).json({ error: error.message });
            return;
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user with hashed password and handle
        const userData = {
            ...req.body,
            password: hashedPassword,
            handle,
        };

        // Save user to database
        const user = new User(userData);

        await user.save();

        res.status(201).json({ message: "Usuario creado" });
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("usuario no encontrado");
            res.status(404).json({ error: error.message });
            return;
        }

        // Compare password
        const isPasswordCorrect = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            const error = new Error("contraseña incorrecta");
            res.status(401).json({ error: error.message });
            return;
        }

        res.status(200).json({ message: "Usuario autenticado" });
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error" });
    }
};
