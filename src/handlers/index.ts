import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            const error = new Error("El usuario ya existe");
            res.status(409).json({ error: error.message });
            return;
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user with hashed password
        const userData = {
            ...req.body,
            password: hashedPassword,
        };

        // Save user to database
        const user = new User(userData);

        await user.save();

        res.status(201).json({ message: "Usuario creado" });
    } catch (error: any) {
        res.status(500).json({ error: "Ha ocurrido un error" });
    }
};
