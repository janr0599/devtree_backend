import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            const error = new Error("El usuario ya existe");
            res.status(409).json({ error: error.message });
            return;
        }

        const user = new User(req.body);

        await user.save();

        res.status(201).json({ message: "Usuario creado" });
    } catch (error) {
        console.log(error);
    }
};
