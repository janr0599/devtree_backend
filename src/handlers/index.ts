import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).send("El usuario ya existe");
            return;
        }

        const user = new User(req.body);

        await user.save();

        res.send("Registrado");
    } catch (error) {
        console.log(error);
    }
};
